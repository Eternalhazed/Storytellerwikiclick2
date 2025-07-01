import { Book, BookWithRelations } from "@/database/books"
import {
  getInternalBookDirectory,
  getInternalOriginalAudioFilepath,
  getProcessedAudioFilepath,
  getTranscriptionsFilepath,
} from "./paths"
import { copyFile, mkdir, readdir, rm, stat } from "node:fs/promises"
import { isAudioFile } from "@/audio"
import { dirname, basename } from "node:path"

export async function getProcessedAudioFiles(book: Book) {
  const directory = getProcessedAudioFilepath(book)

  const entries = await readdir(directory, { recursive: true })
  return entries.filter((path) => isAudioFile(path))
}

export async function persistEpub(book: Book, tmpPath: string) {
  const filepath = getInternalBookDirectory(book)
  const directory = dirname(filepath)
  await mkdir(directory, { recursive: true })
  await copyFile(tmpPath, filepath)
  await rm(tmpPath)
}

export async function persistAudio(
  book: BookWithRelations,
  audioPaths: string[],
) {
  await Promise.all(
    audioPaths.map(async (path) => {
      const filename = basename(path)
      const filepath = getInternalOriginalAudioFilepath(book, filename)
      const directory = dirname(filepath)
      await mkdir(directory, { recursive: true })
      await copyFile(path, filepath)
      await rm(path)
    }),
  )
}

export async function originalEpubExists(book: BookWithRelations) {
  if (!book.ebook) return false
  try {
    await stat(book.ebook.filepath)
    return true
  } catch {
    return false
  }
}

export async function originalAudioExists(book: BookWithRelations) {
  if (!book.audiobook) return false
  const originalAudioDirectory = book.audiobook.filepath
  try {
    const filenames = await readdir(originalAudioDirectory)

    return filenames.some((filename) => {
      return filename.endsWith(".zip") || isAudioFile(filename)
    })
  } catch {
    return false
  }
}

export async function deleteProcessed(book: BookWithRelations) {
  await Promise.all([
    rm(getProcessedAudioFilepath(book), {
      recursive: true,
      force: true,
    }),
    rm(getTranscriptionsFilepath(book), {
      recursive: true,
      force: true,
    }),
  ])
}

export async function deleteOriginals(book: BookWithRelations) {
  await Promise.all([
    ...(book.ebook ? [rm(book.ebook.filepath, { force: true })] : []),
    ...(book.audiobook
      ? [
          rm(book.audiobook.filepath, {
            recursive: true,
            force: true,
          }),
        ]
      : []),
  ])
}

export async function deleteAssets(book: BookWithRelations) {
  await Promise.all([
    deleteOriginals(book),
    deleteProcessed(book),
    ...(book.alignedBook?.filepath ? [rm(book.alignedBook.filepath)] : []),
  ])
}
