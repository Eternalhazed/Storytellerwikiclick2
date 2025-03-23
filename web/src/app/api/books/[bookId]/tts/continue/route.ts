import { withHasPermission } from "@/auth"
import { getBookUuid } from "@/database/books"
import { generateTTS } from "@/tts/tts"
import { logger } from "@/logging"

export const dynamic = "force-dynamic"

type Params = Promise<{
  bookId: string
}>

export const POST = withHasPermission<Params>("book_process")(async (
  _request,
  context,
) => {
  const { bookId } = await context.params
  const bookUuid = getBookUuid(bookId)

  logger.info(`Continuing TTS generation for book: ${bookId}`)

  // Start the TTS generation with forceRegenerate=false to continue from where it left off
  // We run this as a background process so the API can respond immediately
  void generateTTS(bookUuid, { forceRegenerate: false })
    .then(() => {
      logger.info(`TTS generation completed for book: ${bookId}`)
    })
    .catch((error: unknown) => {
      logger.error(
        `Error in TTS generation for book ${bookId}: ${String(error)}`,
      )
    })

  return new Response(null, { status: 204 })
})
