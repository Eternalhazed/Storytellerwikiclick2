import { getTTSChunksFilepath, getTTSDirectory } from "@/assets/paths"
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
const getTTSChunksFilepathTyped = getTTSChunksFilepath as ChunksPathGetter

type PathGetter = (bookUuid: UUID) => string
type ChunksPathGetter = (bookUuid: UUID, filename: string) => string

export async function generateTTS(
  bookUuid: UUID,
  onProgress?: (progress: number) => void,
): Promise<ProcessedBookForTTS> {
  // Initialize Orpheus TTS engine (creates venv if needed)
  // await initializeOrpheus()
  await initializeMLXAudio()

  // Create directory for TTS chunks
  const ttsDirectory = getTTSDirectoryTyped(bookUuid)
  await mkdir(path.resolve(ttsDirectory), { recursive: true })

  // Process EPUB for TTS
  try {
    const processedBook = await processEpubForTTS(bookUuid)

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

        // await textToSpeech(
        //   chunk.text,
        //   outputFile,
        //   // { type: 'orpheus' },
        //   // {
        //   //   voice: settings.ttsVoice || "tara",
        //   //   format: "mp3",
        //   //   temperature: 0.7
        //   // }
        // )
        await textToSpeech(chunk.text, outputFile, {
          model: "mlx-community/Kokoro-82M-4bit",
          voice: "af_heart",
          format: "mp3",
          temperature: 0.7,
          speed: 1.0,
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
