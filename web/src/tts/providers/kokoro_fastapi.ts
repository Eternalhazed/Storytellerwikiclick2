"use server"

import { logger } from "@/logging"
import { BaseTTSOptions } from "../types"
import fs from "fs/promises"
import path from "path"

export interface KokoroFastAPITTSOptions extends BaseTTSOptions {
  // Voice options
  voice: string
  speed?: number

  // Server options
  baseUrl: string
}

interface KokoroFastAPIResponse {
  audio: string // base64 encoded audio
  audio_format: string // e.g. "audio/mpeg"
  timestamps: Array<{
    word: string
    start_time: number
    end_time: number
  }>
}

interface TranscribeFormatWord {
  type: string
  text: string
  startTime: number
  endTime: number
  score: number
  startOffsetUtf16: number
  endOffsetUtf16: number
}

export async function textToSpeech(
  text: string,
  outputDirectory: string,
  options: KokoroFastAPITTSOptions,
): Promise<void> {
  if (!options.filePrefix) {
    throw new Error("filePrefix is required for KokoroFastAPI output")
  }

  // Validate input
  if (!text || text.trim() === "") {
    logger.warn("Empty text chunk detected, skipping TTS generation")
    return
  }

  if (!options.baseUrl) {
    throw new Error("baseUrl is required for KokoroFastAPI")
  }

  logger.debug(
    `Processing text (${text.length} chars): "${text.substring(0, 50)}${text.length > 50 ? "..." : ""}"`,
  )

  try {
    const requestBody = {
      model: "kokoro",
      input: text,
      voice: options.voice,
      speed: options.speed || 1.0,
      response_format: "mp3",
      stream: true, // We want the complete response but using false returns 500
    }

    logger.info(
      `Calling KokoroFastAPI TTS with options: ${JSON.stringify({
        ...requestBody,
        input: text.length > 20 ? `${text.substring(0, 20)}...` : text,
      })}`,
    )

    const response = await fetch(
      `${options.baseUrl.replace(/\/$/, "")}/dev/captioned_speech`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `KokoroFastAPI error: ${response.status} ${response.statusText} - ${errorText}`,
      )
    }

    const responseData: KokoroFastAPIResponse =
      (await response.json()) as KokoroFastAPIResponse

    // Convert timestamps to our transcription format
    const transcript = text
    const wordTimeline = convertTimestampsToTranscribeFormat(
      responseData.timestamps,
      text,
    )

    // Save the audio file - decode base64 string
    const outputPath = path.join(outputDirectory, `${options.filePrefix}.mp3`)
    const audioBuffer = Buffer.from(responseData.audio, "base64")
    await fs.writeFile(outputPath, audioBuffer)

    // Save the timeline result
    const timelineOutputPath = path.join(
      outputDirectory,
      `${options.filePrefix}.json`,
    )
    await fs.writeFile(
      timelineOutputPath,
      JSON.stringify({
        transcript,
        wordTimeline,
      }),
    )

    logger.info(`Successfully generated TTS for file: ${options.filePrefix}`)
  } catch (error) {
    logger.error(
      `KokoroFastAPI TTS error: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw error
  }
}

/**
 * Converts the raw timestamps to the format expected by the transcribe function
 */
function convertTimestampsToTranscribeFormat(
  timestamps: Array<{ word: string; start_time: number; end_time: number }>,
  originalText: string,
): TranscribeFormatWord[] {
  // Process words to add offset information
  let currentOffset = 0
  return timestamps.map((timestamp) => {
    // Find where this word appears in the transcript starting from the current offset
    const wordIndex = originalText.indexOf(timestamp.word, currentOffset)

    // If found, update the offset for next search
    const startOffset = wordIndex !== -1 ? wordIndex : currentOffset
    const endOffset =
      wordIndex !== -1
        ? wordIndex + timestamp.word.length
        : currentOffset + timestamp.word.length

    if (wordIndex !== -1) {
      currentOffset = endOffset
    }

    return {
      type: "word",
      text: timestamp.word,
      startTime: timestamp.start_time,
      endTime: timestamp.end_time,
      score: 1.0, // TTS doesn't have confidence scores, so we use 1.0
      startOffsetUtf16: startOffset,
      endOffsetUtf16: endOffset,
    }
  })
}
