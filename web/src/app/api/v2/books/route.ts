import {
  originalAudioExists,
  originalEpubExists,
  persistAudio,
  persistEpub,
} from "@/assets/fs"
import { withHasPermission } from "@/auth/auth"
import { createBookFromEpub, getBooks, updateBook } from "@/database/books"
import { Epub } from "@smoores/epub"
import { NextResponse } from "next/server"
import { basename, join } from "node:path"
import busboy from "busboy"
import { tmpdir } from "node:os"
import { randomUUID } from "node:crypto"
import { createWriteStream, mkdirSync } from "node:fs"
import { Readable } from "node:stream"
import { ReadableStream } from "node:stream/web"
import { logger } from "@/logging"
import { isProcessing, isQueued } from "@/work/distributor"
import {
  getDefaultSuffix,
  getInternalAudioDirectory,
  getInternalEpubFilepath,
} from "@/assets/paths"

export const dynamic = "force-dynamic"

/**
 * @summary List all books in the library
 * @desc Use the `alignedOnly` param to limit results to books that
 *       have been aligned by Storyteller successfully.
 */
export const GET = withHasPermission("bookList")(async (request) => {
  const url = request.nextUrl
  const alignedOnly = url.searchParams.get("aligned")

  const books = await getBooks(null, alignedOnly !== null)

  return NextResponse.json(
    await Promise.all(
      books.map(async (book) => {
        return {
          ...book,
          originalFilesExist: (
            await Promise.all([
              originalEpubExists(book),
              originalAudioExists(book),
            ])
          ).every((originalsExist) => originalsExist),
          processingStatus: isProcessing(book.uuid)
            ? "processing"
            : isQueued(book.uuid)
              ? "queued"
              : null,
        }
      }),
    ),
  )
})

/**
 * @summary Create a new book
 * @desc A new book is created from an EPUB file and some number of
 *       audiobook files. These can either be sent in the request, or
 *       the request can specify server-side filepaths to find the
 *       input files.
 */
export const POST = withHasPermission("bookCreate")(async (request) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const { epubPath, audioDirectory } = (await request.json()) as {
      epubPath: string
      audioDirectory: string
    }

    try {
      const epub = await Epub.from(epubPath)
      const book = await createBookFromEpub(
        epub,
        basename(epubPath).replace(".epub", ""),
        epubPath,
        audioDirectory,
      )
      await epub.close()

      return NextResponse.json(book)
    } catch (e) {
      logger.error(e)
      return NextResponse.json(
        {
          message: "Missing epubPath or audioPaths",
        },
        { status: 405 },
      )
    }
  }

  const body = request.body as ReadableStream<Uint8Array> | undefined
  if (!body) {
    return NextResponse.json(
      {
        message: "Missing epubPath or audioPaths",
      },
      { status: 405 },
    )
  }

  const headers = Object.fromEntries(request.headers.entries())
  const tmpDir = join(tmpdir(), `storyteller-upload-${randomUUID()}`)
  const paths: {
    epubFile?: string
    audioFiles: string[]
  } = { audioFiles: [] }

  // Manually stream files to disk with busboy to
  // avoid hitting 2GB ceiling in undici's
  // .formData implementation
  await new Promise((resolve, reject) => {
    const bus = busboy({ headers: headers })
    bus.on("file", (name, file, info) => {
      const tmpNamedDir = join(tmpDir, name)
      const tmpFile = join(tmpNamedDir, info.filename)
      if (name === "epub_file") {
        paths.epubFile = tmpFile
      } else if (name === "audio_files") {
        paths.audioFiles.push(tmpFile)
      } else {
        return
      }
      mkdirSync(tmpNamedDir, { recursive: true })
      file.pipe(createWriteStream(tmpFile))
    })
    bus.on("error", reject)
    bus.on("close", resolve)
    Readable.fromWeb(body).pipe(bus)
  })

  if (!paths.epubFile || !paths.audioFiles.length) {
    return NextResponse.json(
      {
        message: "Missing epub_file or audio_files",
      },
      { status: 405 },
    )
  }

  const epub = await Epub.from(paths.epubFile)

  let book = await createBookFromEpub(
    epub,
    basename(paths.epubFile).replace(".epub", ""),
  )

  book = await updateBook(
    book.uuid,
    {},
    {
      ebook: { filepath: getInternalEpubFilepath(book) },
      audiobook: { filepath: getInternalAudioDirectory(book) },
    },
  )

  try {
    await persistEpub(book, paths.epubFile)
  } catch (e) {
    if (e instanceof Error && "code" in e && e.code === "EEXIST") {
      book = await updateBook(book.uuid, {
        suffix: getDefaultSuffix(book.uuid),
      })
      await persistEpub(book, paths.epubFile)
    }

    throw e
  }

  await persistAudio(book, paths.audioFiles)

  return NextResponse.json(book)
})
