import {
  ProcessingTaskStatus,
  ProcessingTaskType,
} from "@/apiModels/models/ProcessingStatus"
import { deleteProcessed } from "@/assets/assets"
import {
  AudioFile,
  getCustomEpubCover,
  getEpubCoverFilename,
  getProcessedAudioFiles,
} from "@/assets/covers"
import {
  getTranscriptionsFilepath,
  getProcessedAudioFilepath,
  getEpubSyncedFilepath,
} from "@/assets/paths"
import { getBooks } from "@/database/books"
import {
  PROCESSING_TASK_ORDER,
  type ProcessingTask,
} from "@/database/processingTasks"
import { Settings } from "@/database/settings"
import { logger } from "@/logging"
import {
  getTranscriptionFilename,
  getTranscriptions,
  processAudiobook,
} from "@/process/processAudio"
import { getFullText, processEpub, readEpub } from "@/process/processEpub"
import { getInitialPrompt } from "@/process/prompt"
import { getSyncCache } from "@/synchronize/syncCache"
import { Synchronizer } from "@/synchronize/synchronizer"
import { installWhisper, transcribeTrack } from "@/transcribe"
import { UUID } from "@/uuid"
import { getCurrentVersion } from "@/versions"
import { AsyncSemaphore } from "@esfx/async-semaphore"
import type { RecognitionResult } from "echogarden/dist/api/Recognition"
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { MessagePort } from "node:worker_threads"
import { generateTTS } from "@/tts/tts"
import { MLXModel } from "@/tts/providers/mlx_audio"

async function findTTSAudioFiles(
  bookUuid: UUID,
): Promise<{ filename: string }[] | null> {
  try {
    const processedDirectory = getProcessedAudioFilepath(bookUuid)
    const files = await readdir(processedDirectory)

    // Get audio files with mp3 extension (common for TTS output)
    const audioFiles = files.filter((file) =>
      /\.(mp3|m4a|ogg|wav|flac)$/i.test(file),
    )

    if (audioFiles.length === 0) {
      return null
    }

    // Map them to the format expected by transcribeTrack
    return audioFiles.map((filename) => ({
      filename,
    }))
  } catch (e: unknown) {
    logger.error(`Failed to find TTS audio files: ${String(e)}`)
    return null
  }
}

export async function transcribeBook(
  bookUuid: UUID,
  initialPrompt: string | null,
  locale: Intl.Locale,
  settings: Settings,
  onProgress?: (progress: number) => void,
) {
  const semaphore = new AsyncSemaphore(settings.parallelTranscribes)
  const transcriptionsPath = getTranscriptionsFilepath(bookUuid)
  await mkdir(transcriptionsPath, { recursive: true })
  // Try to get processed audio files using the standard method
  let audioFiles = await getProcessedAudioFiles(bookUuid)

  // If standard method fails, try to find TTS-generated audio files
  if (!audioFiles) {
    logger.info(
      "No standard processed audio files found, looking for TTS-generated files...",
    )
    audioFiles = (await findTTSAudioFiles(bookUuid)) as AudioFile[] | undefined

    if (!audioFiles) {
      throw new Error(
        "Failed to transcribe book: found no processed audio files",
      )
    }
    logger.info(
      `Found ${audioFiles.length} TTS-generated audio files for transcription`,
    )
  }
  if (
    !settings.transcriptionEngine ||
    settings.transcriptionEngine === "whisper.cpp"
  ) {
    await installWhisper(settings)
  }

  const transcriptions: Pick<
    RecognitionResult,
    "transcript" | "wordTimeline"
  >[] = []

  await Promise.all(
    audioFiles.map(async (audioFile) => {
      await semaphore.wait()
      try {
        const transcriptionFilepath = getTranscriptionsFilepath(
          bookUuid,
          getTranscriptionFilename(audioFile),
        )
        const filepath = getProcessedAudioFilepath(bookUuid, audioFile.filename)
        try {
          const existingTranscription = await readFile(transcriptionFilepath, {
            encoding: "utf-8",
          })
          logger.info(`Found existing transcription for ${filepath}`)
          transcriptions.push(
            JSON.parse(existingTranscription) as Pick<
              RecognitionResult,
              "transcript" | "wordTimeline"
            >,
          )
        } catch (_) {
          const transcription = await transcribeTrack(
            filepath,
            initialPrompt,
            locale,
            settings,
          )
          transcriptions.push(transcription)
          await writeFile(
            transcriptionFilepath,
            JSON.stringify({
              transcript: transcription.transcript,
              wordTimeline: transcription.wordTimeline,
            }),
          )
        }
        onProgress?.((transcriptions.length + 1) / audioFiles.length)
      } finally {
        semaphore.release()
      }
    }),
  )
  return transcriptions
}

/**
 * Determines which tasks still need to be completed
 */
export function determineRemainingTasks(
  bookUuid: UUID,
  processingTasks: ProcessingTask[],
): Array<Omit<ProcessingTask, "uuid"> & { uuid?: UUID }> {
  const sortedTasks = [...processingTasks].sort(
    (taskA, taskB) =>
      PROCESSING_TASK_ORDER[taskA.type] - PROCESSING_TASK_ORDER[taskB.type],
  )

  if (sortedTasks.length === 0) {
    return Object.entries(PROCESSING_TASK_ORDER)
      .sort(([, orderA], [, orderB]) => orderA - orderB)
      .map(([type]) => ({
        type: type as ProcessingTaskType,
        status: ProcessingTaskStatus.STARTED,
        progress: 0,
        bookUuid,
      }))
  }

  const lastCompletedTaskIndex = sortedTasks.findLastIndex(
    (task) => task.status === ProcessingTaskStatus.COMPLETED,
  )

  // Get remaining tasks from the current list
  const remainingExistingTasks = sortedTasks.slice(lastCompletedTaskIndex + 1)

  // Find the order of the last completed task (or -1 if none)
  const lastCompletedOrder =
    lastCompletedTaskIndex >= 0 && sortedTasks[lastCompletedTaskIndex]
      ? PROCESSING_TASK_ORDER[sortedTasks[lastCompletedTaskIndex].type]
      : -1

  // Collect existing task types that are pending
  const existingTypes = new Set(remainingExistingTasks.map((task) => task.type))

  // Find missing tasks that should come after the last completed task
  const missingTasks = Object.entries(PROCESSING_TASK_ORDER)
    .filter(
      ([type, order]) =>
        !existingTypes.has(type as ProcessingTaskType) &&
        order > lastCompletedOrder,
    )
    .map(([type]) => ({
      type: type as ProcessingTaskType,
      status: ProcessingTaskStatus.STARTED,
      progress: 0,
      bookUuid,
    }))

  // Combine and sort all tasks
  return [...remainingExistingTasks, ...missingTasks].sort(
    (a, b) => PROCESSING_TASK_ORDER[a.type] - PROCESSING_TASK_ORDER[b.type],
  )
}

export default async function processBook({
  bookUuid,
  restart,
  settings,
  port,
}: {
  bookUuid: UUID
  restart: boolean
  settings: Settings
  port: MessagePort
}) {
  port.postMessage({ type: "processingStarted", bookUuid })

  if (restart) {
    await deleteProcessed(bookUuid)
  }

  const currentTasks: ProcessingTask[] = await new Promise((resolve) => {
    port.once("message", resolve)
  })

  // const currentTasks = await getProcessingTasksForBook(bookUuid)
  const remainingTasks = determineRemainingTasks(bookUuid, currentTasks)

  // get book info from db
  const [book] = getBooks([bookUuid])
  if (!book) throw new Error(`Failed to retrieve book with uuid ${bookUuid}`)
  // book reference to use in log
  const bookRefForLog = `"${book.title}" (uuid: ${bookUuid})`

  logger.info(
    `Found ${remainingTasks.length} remaining tasks for book ${bookRefForLog}`,
  )

  for (const task of remainingTasks) {
    port.postMessage({
      type: "taskTypeUpdated",
      bookUuid,
      payload: {
        taskUuid: task.uuid,
        taskType: task.type,
        taskStatus: task.status,
      },
    })

    const taskUuid: UUID = await new Promise((resolve) => {
      port.once("message", resolve)
    })

    const onProgress = (progress: number) => {
      port.postMessage({
        type: "taskProgressUpdated",
        bookUuid,
        payload: { taskUuid, progress },
      })
    }

    try {
      if (task.type === ProcessingTaskType.SPLIT_CHAPTERS) {
        logger.info("Pre-processing...")
        await processEpub(bookUuid)

        // Check if original audio directory exists before processing audio
        try {
          await processAudiobook(
            bookUuid,
            settings.maxTrackLength ?? null,
            settings.codec ?? null,
            settings.bitrate ?? null,
            new AsyncSemaphore(settings.parallelTranscodes),
            onProgress,
          )
        } catch (e) {
          logger.error(
            `Error processing audio for book ${bookUuid}: ${e instanceof Error ? e.message : String(e)}`,
          )
        }
      }

      if (task.type === ProcessingTaskType.TTS) {
        logger.info(`Generating TTS chunks for book ${bookRefForLog}...`)

        logger.info("TTS Settings from database:", {
          engine: settings.ttsEngine ?? "(not set)",
          model: settings.ttsModel ?? "(not set)",
          voice: settings.ttsVoice ?? "(not set)",
          language: settings.ttsLanguage ?? "(not set)",
          temperature: settings.ttsTemperature ?? "(not set)",
          topP: settings.ttsTopP ?? "(not set)",
          topK: settings.ttsTopK ?? "(not set)",
          speed: settings.ttsSpeed ?? "(not set)",
          pitch: settings.ttsPitch ?? "(not set)",
          normalize: settings.ttsNormalize ?? "(not set)",
          targetPeak: settings.ttsTargetPeak ?? "(not set)",
          bitrate: settings.ttsBitrate ?? "(not set)",
        })

        const engine =
          settings.ttsEngine ??
          (process.platform === "darwin" ? "mlx" : "echogarden")

        logger.info(`Selected TTS engine: ${engine}`)

        await generateTTS(
          bookUuid,
          {
            engine,
            ...(engine === "echogarden" && {
              echogardenOptions: {
                voice: settings.ttsVoice ?? "Heart",
                language: settings.ttsLanguage ?? "en-US",
                speed: settings.ttsSpeed ?? 1.0,
                pitch: settings.ttsPitch ?? 1.0,
                normalize: settings.ttsNormalize ?? true,
                targetPeak: settings.ttsTargetPeak ?? -3,
                bitrate: settings.ttsBitrate ?? 192000,
              },
            }),
            ...(engine === "mlx" && {
              model: settings.ttsModel ?? MLXModel.KOKORO,
              temperature: settings.ttsTemperature ?? 0.6,
              topP: settings.ttsTopP ?? 0.9,
              topK: settings.ttsTopK ?? 50,
            }),
          },
          onProgress,
        )

        logger.info(
          `Successfully generated TTS chunks for book ${bookRefForLog}`,
        )
      }

      if (task.type === ProcessingTaskType.TRANSCRIBE_CHAPTERS) {
        logger.info("Transcribing...")
        const epub = await readEpub(bookUuid)
        const title = await epub.getTitle()
        const [book] = getBooks([bookUuid])
        if (!book)
          throw new Error(`Failed to retrieve book with uuid ${bookUuid}`)

        const locale = book.language
          ? new Intl.Locale(book.language)
          : (await epub.getLanguage()) ?? new Intl.Locale("en-US")

        const fullText = await getFullText(epub)
        const initialPrompt =
          locale.language === "en"
            ? await getInitialPrompt(title ?? "", fullText)
            : null

        await transcribeBook(
          bookUuid,
          initialPrompt,
          locale,
          settings,
          onProgress,
        )
      }

      if (task.type === ProcessingTaskType.SYNC_CHAPTERS) {
        const epub = await readEpub(bookUuid)
        const audioFiles = await getProcessedAudioFiles(bookUuid)
        const transcriptions = await getTranscriptions(bookUuid)
        if (!audioFiles) {
          throw new Error(`No audio files found for book ${bookUuid}`)
        }
        logger.info("Syncing narration...")
        const syncCache = await getSyncCache(bookUuid)
        const synchronizer = new Synchronizer(
          epub,
          syncCache,
          audioFiles.map((audioFile) =>
            getProcessedAudioFilepath(bookUuid, audioFile.filename),
          ),
          transcriptions,
        )
        await synchronizer.syncBook(onProgress)
        const [book] = getBooks([bookUuid])

        if (!book)
          throw new Error(`Failed to retrieve book with uuid ${bookUuid}`)

        await epub.setTitle(book.title)
        if (book.language) {
          await epub.setLanguage(new Intl.Locale(book.language))
        }
        const epubCover = await getCustomEpubCover(bookUuid)
        const epubFilename = await getEpubCoverFilename(bookUuid)
        if (epubCover) {
          const prevCoverItem = await epub.getCoverImageItem()
          await epub.setCoverImage(
            prevCoverItem?.href ?? `images/${epubFilename}`,
            epubCover,
          )
        }
        /* Add metadata : app version */
        const appVersion = getCurrentVersion()
        await epub.addMetadata({
          type: "meta",
          properties: { property: "storyteller:version" },
          value: appVersion,
        })
        // We need UTC with integer seconds, but toISOString gives UTC with ms
        const dateTimeString = new Date().toISOString().replace(/\.\d+/, "")
        await epub.addMetadata({
          type: "meta",
          properties: { property: "storyteller:media-overlays-modified" },
          value: dateTimeString,
        })

        await epub.setPackageVocabularyPrefix(
          "storyteller",
          "https://storyteller-platform.gitlab.io/storyteller/docs/vocabulary",
        )

        await epub.writeToFile(getEpubSyncedFilepath(bookUuid))
        await epub.close()
      }

      port.postMessage({
        type: "taskCompleted",
        bookUuid,
        payload: { taskUuid },
      })
    } catch (e) {
      logger.error(
        `Encountered error while running task "${task.type}" for book ${bookUuid}`,
      )
      console.error(e)
      port.postMessage({
        type: "processingFailed",
        bookUuid,
        payload: { taskUuid },
      })
      return
    }
  }
  logger.info(`Completed synchronizing book ${bookRefForLog})`)
  port.postMessage({ type: "processingCompleted", bookUuid })
}
