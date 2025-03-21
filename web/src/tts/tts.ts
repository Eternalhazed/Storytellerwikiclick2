import { Settings } from "@/database/settings"
import { getTTSChunksFilepath, getTTSDirectory } from "@/assets/paths"
import { logger } from "@/logging"
import {
  ProcessedBookForTTS,
  processEpubForTTS,
} from "@/process/processEpubForTTS"
import { UUID } from "@/uuid"
import { mkdir, writeFile } from "node:fs/promises"
import path from "path"
import { initializeOrpheus, textToSpeech } from "./providers/orpheus"

// Type assertions for imported functions
const getTTSDirectoryTyped = getTTSDirectory as PathGetter
const getTTSChunksFilepathTyped = getTTSChunksFilepath as ChunksPathGetter

type PathGetter = (bookUuid: UUID) => string
type ChunksPathGetter = (bookUuid: UUID, filename: string) => string

export async function generateTTS(
  bookUuid: UUID,
  settings: Settings,
  onProgress?: (progress: number) => void,
): Promise<ProcessedBookForTTS> {
  // Initialize Orpheus TTS engine (creates venv if needed)
  await initializeOrpheus()

  // Create directory for TTS chunks
  const ttsDirectory = getTTSDirectoryTyped(bookUuid)
  await mkdir(path.resolve(ttsDirectory), { recursive: true })

  // Process EPUB for TTS
  const maxChunkLength = Number(settings.ttsMaxChunkLength || 1000)
  logger.info(
    `Starting TTS processing for book ${bookUuid} with max chunk length ${maxChunkLength}`,
  )

  try {
    const processedBook = await processEpubForTTS(bookUuid, maxChunkLength)

    // Save the processed chunks to a JSON file for later use
    const ttsChunksFile = getTTSChunksFilepathTyped(bookUuid, "tts-chunks.json")
    await writeFile(
      path.resolve(ttsChunksFile),
      JSON.stringify(processedBook),
      "utf-8",
    )

    logger.info(`Successfully wrote TTS chunks to ${ttsChunksFile}`)

    // Generate TTS audio for each chunk
    const totalChunks = processedBook.chapters.reduce(
      (sum, chapter) => sum + chapter.chunks.length,
      0,
    )
    let processedChunks = 0

    for (const chapter of processedBook.chapters) {
      for (const chunk of chapter.chunks) {
        const outputFile = getTTSChunksFilepathTyped(
          bookUuid,
          `${chunk.chapterIndex}-${chunk.position}.mp3`,
        )

        await textToSpeech(
          chunk.text,
          outputFile,
          // { type: 'orpheus' },
          // {
          //   voice: settings.ttsVoice || "tara",
          //   format: "mp3",
          //   temperature: 0.7
          // }
        )

        processedChunks++
        if (onProgress) {
          onProgress(processedChunks / totalChunks)
        }
      }
    }

    return processedBook
  } catch (error) {
    logger.error(
      `Error generating TTS chunks: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw error
  }
}
