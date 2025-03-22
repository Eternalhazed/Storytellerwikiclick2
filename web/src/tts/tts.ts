import { getTTSDirectory, getTTSChunksFilepath } from "@/assets/paths"
import { logger } from "@/logging"
import {
  ProcessedBookForTTS,
  processEpubForTTS,
} from "@/process/processEpubForTTS"
import { UUID } from "@/uuid"
import { mkdir, writeFile } from "node:fs/promises"
import path from "path"
// import { initializeOrpheus, textToSpeech } from "./providers/orpheus"
import { initializeMLXAudio, textToSpeech } from "./providers/mlx_audio"

// Type assertions for imported functions
const getTTSDirectoryTyped = getTTSDirectory as PathGetter

type PathGetter = (bookUuid: UUID) => string

export interface TTSGenerationOptions {
  maxChunkSize?: number
  voice?: string
  model?: string
  speed?: number
  temperature?: number
}

export async function generateTTS(
  bookUuid: UUID,
  options: TTSGenerationOptions = {},
  onProgress?: (progress: number) => void,
): Promise<ProcessedBookForTTS> {
  // Set default options
  const {
    maxChunkSize = 2000,
    voice = "af_heart",
    model = "mlx-community/Kokoro-82M-4bit",
  } = options

  // Initialize MLX Audio engine (creates venv if needed)
  await initializeMLXAudio()

  // Create directory for TTS chunks
  const ttsDirectory = getTTSDirectoryTyped(bookUuid)
  await mkdir(path.resolve(ttsDirectory), { recursive: true })

  // Process EPUB for TTS with configurable chunk size
  try {
    logger.info(
      `Processing EPUB with max chunk size of ${maxChunkSize} characters`,
    )
    const processedBook = await processEpubForTTS(bookUuid, maxChunkSize)

    // Save the processed chunks to a JSON file for later use
    const ttsChunksFile = getTTSChunksFilepath(bookUuid, "tts-chunks.json")
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
        const outputDir = getTTSDirectoryTyped(bookUuid)
        const filePrefix = `${chapter.index}_${chunk.position}`

        await textToSpeech(chunk.text, path.resolve(outputDir), {
          model,
          voice,
          format: "mp3",
          filePrefix, // Use chapter and position to create unique filenames
        })

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
