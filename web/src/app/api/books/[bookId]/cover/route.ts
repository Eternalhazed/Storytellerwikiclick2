import { withHasPermission } from "@/auth/auth"
import { getBookUuid } from "@/database/books"
import { open } from "node:fs/promises"
import { NextResponse } from "next/server"
import { basename } from "node:path"
import { Epub } from "@smoores/epub"
import {
  getAudioCoverFilepath,
  getEpubCoverFilepath,
} from "@/assets/legacy/covers"
import { getEpubFilepath } from "@/assets/legacy/paths"

export const dynamic = "force-dynamic"

type Params = Promise<{
  bookId: string
}>

/**
 * @summary deprecated - Get the cover image for a book
 * @desc Use the `audio` search param to get the audio cover. The
 *       default is to get the text cover.
 */
export const GET = withHasPermission<Params>("bookRead")(async (
  request,
  context,
) => {
  const { bookId } = await context.params
  const bookUuid = await getBookUuid(bookId)
  const audio = typeof request.nextUrl.searchParams.get("audio") === "string"

  const coverFilepath = audio
    ? await getAudioCoverFilepath(bookUuid)
    : await getEpubCoverFilepath(bookUuid)

  try {
    // This actually might be undefined, but if it is, we want to
    // throw so that we end up in the catch block
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = await open(coverFilepath!)

    // @ts-expect-error NextResponse handles Node Streams just fine
    return new NextResponse(file.createReadStream(), {
      headers: {
        // If we got here, this is definitely defined
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        "Content-Disposition": `attachment; filename="${basename(coverFilepath!)}"`,
      },
    })
  } catch (_) {
    const epub = await Epub.from(getEpubFilepath(bookUuid))
    const coverImage = await epub.getCoverImage()
    if (!coverImage) return new NextResponse(null, { status: 404 })

    return new NextResponse(coverImage)
  }
})
