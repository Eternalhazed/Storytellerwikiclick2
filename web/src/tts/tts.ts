import {
  getProcessedAudioFilepath,
  getTranscriptionsFilepath,
  getTTSChunksFilepath,
} from "@/assets/paths"
import { logger } from "@/logging"
import {
  ProcessedBookForTTS,
  processEpubForTTS,
} from "@/process/processEpubForTTS"
import { UUID } from "@/uuid"
import {
  mkdir,
  writeFile,
  access,
  constants,
  readFile,
  readdir,
  copyFile,
} from "node:fs/promises"
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

/**
 * Format file prefix to ensure proper sorting in the synchronizer
 *
 * This function pads numbers with zeros to ensure consistent sorting
 */
function formatFilePrefix(chapterIndex: number, chunkPosition: number): string {
  // Pad chapter index with zeros
  const paddedChapterIndex = String(chapterIndex).padStart(5, "0")
  // Pad chunk position with zeros
  const paddedChunkPosition = String(chunkPosition).padStart(5, "0")

  return `${paddedChapterIndex}_${paddedChunkPosition}`
}

/**
 * Copy generated transcription JSON files from processed folder to transcriptions folder
 */
async function copyTranscriptionFiles(bookUuid: UUID): Promise<void> {
  try {
    const processedDirectory = getProcessedDirectoryTyped(bookUuid)
    const transcriptionsDirectory = getTranscriptionsFilepath(bookUuid)

    // Create transcriptions directory if it doesn't exist
    await mkdir(transcriptionsDirectory, { recursive: true })

    // Get all JSON files in processed directory
    const files = await readdir(processedDirectory)
    const jsonFiles = files.filter((file) => file.endsWith(".json"))

    if (jsonFiles.length === 0) {
      logger.warn(
        `No JSON transcription files found in processed directory for book ${bookUuid}`,
      )
      return
    }

    // Copy each JSON file to transcriptions directory
    for (const jsonFile of jsonFiles) {
      const sourcePath = path.join(processedDirectory, jsonFile)
      const destPath = path.join(transcriptionsDirectory, jsonFile)
      await copyFile(sourcePath, destPath)
    }

    logger.info(
      `Successfully copied ${jsonFiles.length} transcription files to transcriptions directory`,
    )
  } catch (error) {
    logger.error(
      `Error copying transcription files: ${error instanceof Error ? error.message : String(error)}`,
    )
    // Don't throw error as this is a post-processing step
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
    echogardenOptions: options.echogardenOptions || {},
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
        // Use the new formatting function for consistent file naming
        const filePrefix = formatFilePrefix(chapter.index, chunk.position)
        const outputDir = processedDirectory

        // Check if the audio file already exists
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

        if (options.engine === "echogarden") {
          try {
            // Create complete options object with filePrefix
            const echogardenFullOptions: EchogardenTTSOptions = {
              // Set required defaults
              kokoroModel: "82m-v1.0-quantized",
              kokoroProvider: "cuda",
              voice: "Heart",
              splitToSentences: false,
              filePrefix,
              // Spread user options
              ...(options.echogardenOptions || {}),
            }

            await echogardenTTS(
              chunk.text,
              outputDir,
              echogardenFullOptions,
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
          } catch (error: unknown) {
            logger.error(
              `Error generating TTS for chunk ${filePrefix}: ${error instanceof Error ? error.message : String(error)}`,
            )
            logger.debug(
              `Problematic text: "${chunk.text.substring(0, 100)}..."`,
            )

            logger.info("Attempting to fallback on CPU")
            try {
              // Create full options object with CPU provider
              const fallbackOptions: EchogardenTTSOptions = {
                kokoroModel: "82m-v1.0-fp32",
                kokoroProvider: "cpu",
                voice: "Heart",
                splitToSentences: false,
                filePrefix,
                // Spread any existing user options
                ...(options.echogardenOptions || {}),
              }

              await echogardenTTS(
                chunk.text,
                outputDir,
                fallbackOptions,
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
              // Don't modify original options
            } catch (fallbackError: unknown) {
              logger.error(
                `Fallback to CPU TTS generation failed: ${fallbackError instanceof Error ? fallbackError.message : String(fallbackError)}`,
              )

              logger.info(
                "Attempting to fallback to synthesizing individual sentences",
              )

              // Create sentence-by-sentence options
              const sentenceOptions: EchogardenTTSOptions = {
                kokoroModel: "82m-v1.0-fp32",
                kokoroProvider: "cuda",
                voice: "Heart",
                splitToSentences: true,
                filePrefix,
                // Spread any existing user options
                ...(options.echogardenOptions || {}),
              }

              try {
                await echogardenTTS(
                  chunk.text,
                  outputDir,
                  sentenceOptions,
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
              } catch (sentenceError) {
                logger.info("Skipping chunk due to TTS generation failure:")
                logger.info(chunk.text)
              }
            }
            continue
          }
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

    logger.info(
      `Generated or verified ${processedChunks - skippedChunks} audio chunks`,
    )
    if (skippedChunks > 0) {
      logger.info(
        `Skipped ${skippedChunks} existing audio chunks out of ${totalChunks} total chunks`,
      )
    }

    // Copy transcription files (if any) to transcriptions directory
    // Echogarden generates transcription files automatically
    await copyTranscriptionFiles(bookUuid)

    return processedBook
  } catch (error) {
    logger.error(
      `Error generating TTS chunks: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw error
  }
}
