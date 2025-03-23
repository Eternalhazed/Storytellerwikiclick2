import { getProcessedAudioFilepath, getTTSChunksFilepath } from "@/assets/paths"
import { logger } from "@/logging"
import {
  ProcessedBookForTTS,
  processEpubForTTS,
} from "@/process/processEpubForTTS"
import { UUID } from "@/uuid"
import { mkdir, writeFile, access, constants, readFile } from "node:fs/promises"
import path from "path"
import {
  initializeEchogarden,
  textToSpeech as echogardenTTS,
} from "./providers/echogarden"
import type { EchogardenTTSOptions } from "./providers/echogarden"
import {
  initializeMLXAudio,
  MLXModel,
  textToSpeech,
} from "./providers/mlx_audio"

// Type assertions for imported functions
const getProcessedDirectoryTyped = getProcessedAudioFilepath as PathGetter

type PathGetter = (bookUuid: UUID) => string

export interface TTSGenerationOptions {
  maxChunkSize?: number
  voice?: string
  model?: string
  speed?: number
  temperature?: number
  forceRegenerate?: boolean
  engine?: "mlx" | "echogarden"
  echogardenOptions?: Partial<EchogardenTTSOptions>
}

/**
 * Check if a file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

export async function generateTTS(
  bookUuid: UUID,
  options: TTSGenerationOptions = {},
  onProgress?: (progress: number) => void,
): Promise<ProcessedBookForTTS> {
  // Log the full settings object to debug
  logger.info("TTS Settings:", {
    engine: options.engine,
    model: options.model,
    ttsOptions: options.echogardenOptions || {},
  })

  // Set default options
  const { maxChunkSize, forceRegenerate = false } = options

  // Initialize selected engine
  if (options.engine === "echogarden") {
    await initializeEchogarden()
  } else {
    await initializeMLXAudio()
  }

  // Use processed directory
  const processedDirectory = getProcessedDirectoryTyped(bookUuid)
  await mkdir(path.resolve(processedDirectory), { recursive: true })

  // Process EPUB for TTS with configurable chunk size
  try {
    let processedBook: ProcessedBookForTTS
    const ttsChunksFile = getTTSChunksFilepath(bookUuid, "tts-chunks.json")
    const ttsChunksFilePath = path.resolve(ttsChunksFile)

    // Check if we already have processed chunks
    const chunksExist = await fileExists(ttsChunksFilePath)

    if (!forceRegenerate && chunksExist) {
      // Load existing chunks if available
      logger.info("Loading existing TTS chunks from file")
      const chunksData = await readFile(ttsChunksFilePath, "utf-8")
      processedBook = JSON.parse(chunksData) as ProcessedBookForTTS
    } else {
      // Process the EPUB if chunks don't exist or force regenerate is true
      logger.info(
        `Processing EPUB with max chunk size of ${maxChunkSize} characters`,
      )
      processedBook = await processEpubForTTS(bookUuid, maxChunkSize)

      // Save the processed chunks to a JSON file for later use
      await writeFile(ttsChunksFilePath, JSON.stringify(processedBook), "utf-8")
      logger.info(`Successfully wrote TTS chunks to ${ttsChunksFile}`)
    }

    // Generate TTS audio for each chunk
    const totalChunks = processedBook.chapters.reduce(
      (sum, chapter) => sum + chapter.chunks.length,
      0,
    )
    let processedChunks = 0
    let skippedChunks = 0

    for (const chapter of processedBook.chapters) {
      for (const chunk of chapter.chunks) {
        const outputDir = processedDirectory
        const filePrefix = `${chapter.index}_${chunk.position}`

        // Check if the audio file already exists
        // The MLX Audio script creates files with format "{file_prefix}.mp3" when join_audio is true
        const expectedAudioPath = path.resolve(outputDir, `${filePrefix}.mp3`)
        const audioFileExists = await fileExists(expectedAudioPath)

        if (!forceRegenerate && audioFileExists) {
          // Skip if the file already exists and we're not forcing regeneration
          logger.info(`Skipping existing audio file: ${expectedAudioPath}`)
          skippedChunks++
          processedChunks++

          if (onProgress) {
            onProgress(processedChunks / totalChunks)
          }
          continue
        }

        const expectedAudioPathWithoutExtension = path.resolve(
          outputDir,
          filePrefix,
        )
        // Generate the audio for this chunk
        if (options.engine === "echogarden") {
          await echogardenTTS(
            chunk.text,
            outputDir,
            {
              filePrefix,
              ...options.echogardenOptions,
            },
            (progress) => {
              if (onProgress) {
                // Calculate overall progress
                const totalChunks = processedBook.chapters.reduce(
                  (sum, ch) => sum + ch.chunks.length,
                  0,
                )
                const currentProgress =
                  (processedChunks +
                    progress.segmentCount / chunk.text.length) /
                  totalChunks
                onProgress(currentProgress)
              }
            },
          )
        } else {
          await textToSpeech(chunk.text, outputDir, MLXModel.KOKORO, {
            filePrefix: expectedAudioPathWithoutExtension,
            voice: "af_sky",
            lang_code: "a",
          })
        }

        processedChunks++
        if (onProgress) {
          onProgress(processedChunks / totalChunks)
        }
      }
    }

    if (skippedChunks > 0) {
      logger.info(
        `Skipped ${skippedChunks} existing audio chunks out of ${totalChunks} total chunks`,
      )
    }

    return processedBook
  } catch (error) {
    logger.error(
      `Error generating TTS chunks: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw error
  }
}
