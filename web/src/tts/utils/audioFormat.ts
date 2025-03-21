import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
import { logger } from "@/logging"

/**
 * Converts audio file from one format to another
 * @param inputFile Path to the input audio file
 * @param outputFormat Target format (e.g., 'mp3', 'wav')
 * @param deleteOriginal Whether to delete the original file after conversion
 * @returns Path to the converted audio file
 */
export async function convertAudioFormat(
  inputFile: string,
  outputFormat: string,
  deleteOriginal: boolean = false,
): Promise<string> {
  const outputFile =
    inputFile.substring(0, inputFile.lastIndexOf(".")) + "." + outputFormat

  logger.info(`Converting audio from ${inputFile} to ${outputFile}`)

  return new Promise((resolve, reject) => {
    let command = ffmpeg(inputFile).toFormat(outputFormat)

    // Apply higher quality settings when converting to MP3
    if (outputFormat === "mp3") {
      command = command
        .audioBitrate(192) // bitrateKbps
        .audioCodec("libmp3lame")
        .audioQuality(0) // Use the best quality setting (0 for libmp3lame)
    }

    command
      .on("error", (error: Error) => {
        logger.error(`Error converting audio format: ${error.message}`)
        reject(error)
      })
      .on("end", async () => {
        logger.info(`Audio conversion complete: ${outputFile}`)

        if (deleteOriginal) {
          try {
            await fs.promises.unlink(inputFile)
            logger.info(`Deleted original file: ${inputFile}`)
          } catch (error) {
            logger.warn(`Failed to delete original file: ${String(error)}`)
            // Don't reject here, as the conversion was successful
          }
        }

        resolve(outputFile)
      })
      .save(outputFile)
  })
}

/**
 * Converts WAV audio file to MP3 format
 * @param wavFile Path to the WAV file
 * @param deleteWav Whether to delete the WAV file after conversion
 * @returns Path to the MP3 file
 */
export async function convertWavToMp3(
  wavFile: string,
  deleteWav: boolean = true,
): Promise<string> {
  if (!wavFile.toLowerCase().endsWith(".wav")) {
    throw new Error("Input file must be a WAV file")
  }

  return convertAudioFormat(wavFile, "mp3", deleteWav)
}
