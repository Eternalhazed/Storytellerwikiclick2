import { withHasPermission } from "@/auth"
import { getBookUuid } from "@/database/books"
import { ProcessingTaskType } from "@/apiModels/models/ProcessingStatus"
import { resetProcessingTasks } from "@/database/processingTasks"
import { startProcessing } from "@/work/distributor"
import { logger } from "@/logging"

type Params = Promise<{
  bookId: string
}>

export const POST = withHasPermission<Params>("book_process")(async (
  _request,
  context,
) => {
  const { bookId } = await context.params
  const bookUuid = getBookUuid(bookId)

  try {
    logger.info(`Restarting transcription for book ${bookUuid}`)

    // Reset only the transcription task
    resetProcessingTasks(bookUuid, [ProcessingTaskType.TRANSCRIBE_CHAPTERS])

    // Start processing the book (without full restart)
    // The worker process will handle installing Whisper as needed
    await startProcessing(bookUuid, false)

    return new Response(null, { status: 204 })
  } catch (error) {
    logger.error(`Failed to restart transcription: ${String(error)}`)
    return new Response(
      JSON.stringify({ error: "Failed to restart transcription" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
})
