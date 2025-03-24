"use server"

import * as Echogarden from "echogarden"
import { VoiceGender } from "echogarden"
import { logger } from "@/logging"
import { BaseTTSOptions } from "../types"
import path from "path"
import fs from "fs/promises"
import { Timeline, TimelineEntry } from "echogarden/dist/utilities/Timeline"

export interface EchogardenTTSOptions extends BaseTTSOptions {
  // Engine-specific options
  kokoroModel?: "82m-v1.0-fp32" | "82m-v1.0-quantized"
  kokoroProvider?: "cpu" | "dml" | "cuda"

  // Voice options
  voice?: string
  language?: string
  voiceGender?: VoiceGender // Updated to use correct type

  // Speech characteristics
  speed?: number
  pitch?: number
  pitchVariation?: number

  // Audio configuration
  bitrate?: number

  // Post-processing
  normalize?: boolean
  targetPeak?: number
  maxGainIncrease?: number
}

export async function initializeEchogarden(): Promise<void> {
  try {
    const { voiceList } = await Echogarden.requestVoiceList({
      engine: "kokoro",
    })

    logger.info(
      `Initialized Echogarden with ${voiceList.length} available voices: ${JSON.stringify(voiceList)}`,
    )
  } catch (error) {
    logger.error("Failed to initialize Echogarden:", error)
    throw error
  }
}

export async function textToSpeech(
  text: string,
  outputDirectory: string,
  options: EchogardenTTSOptions,
  onProgress?: (progress: {
    segmentCount: number
    sentenceCount: number
  }) => void,
): Promise<void> {
  if (!options.filePrefix) {
    throw new Error("filePrefix is required for Echogarden output")
  }

  // Add input validation
  if (!text || text.trim() === "") {
    throw new Error("Empty or invalid input text provided to Echogarden TTS")
  }

  // Log text length for debugging
  logger.info(`Processing text with length ${text.length} characters`)

  // Default options
  const defaultOptions = {
    kokoroModel: "82m-v1.0-quantized" as const,
    kokoroProvider: "cpu" as const,
    speed: 1.0,
    pitch: 1.0,
    pitchVariation: 1.0,
    normalize: true,
    targetPeak: -3,
    maxGainIncrease: 30,
    bitrate: 192,
  }

  // Merge with provided options
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }

  try {
    let segmentCount = 0
    let sentenceCount = 0

    const onSegment: Echogarden.SynthesisSegmentEvent = (
      data: Echogarden.SynthesisSegmentEventData,
    ): Promise<void> => {
      segmentCount++
      logger.info(`Generated segment ${segmentCount}: ${data.transcript}`)

      if (onProgress) {
        onProgress({ segmentCount, sentenceCount })
      }

      return Promise.resolve()
    }

    const onSentence: Echogarden.SynthesisSegmentEvent = (
      data: Echogarden.SynthesisSegmentEventData,
    ): Promise<void> => {
      sentenceCount++
      logger.info(`Completed sentence ${sentenceCount}: ${data.transcript}`)

      return Promise.resolve()
    }

    // Generate speech
    const synthesisOptions = {
      engine: "kokoro" as const,

      // Only include optional properties if they're defined
      ...(mergedOptions.language && { language: mergedOptions.language }),
      ...(mergedOptions.voice && { voice: mergedOptions.voice }),
      ...(mergedOptions.voiceGender && {
        voiceGender: mergedOptions.voiceGender,
      }),
      ...(mergedOptions.speed && { speed: mergedOptions.speed }),
      ...(mergedOptions.pitch && { pitch: mergedOptions.pitch }),
      ...(mergedOptions.pitchVariation && {
        pitchVariation: mergedOptions.pitchVariation,
      }),

      // Kokoro specific options
      kokoro: {
        model: mergedOptions.kokoroModel,
        provider: mergedOptions.kokoroProvider,
      },

      // Output format
      outputAudioFormat: {
        codec: "mp3" as const,
        bitrate: mergedOptions.bitrate || 192,
      },

      // Post-processing - simplified without unnecessary conditionals
      postProcessing: {
        normalizeAudio: mergedOptions.normalize,
        targetPeak: mergedOptions.targetPeak,
        maxGainIncrease: mergedOptions.maxGainIncrease,
      },

      // Fixed options
      splitToSentences: true,
      sentenceEndPause: 0.75,
      segmentEndPause: 1.0,
    }

    // Generate speech
    const { audio, timeline } = await Echogarden.synthesize(
      text,
      synthesisOptions,
      onSegment,
      onSentence,
    )

    // Save the audio file
    const outputPath = path.join(outputDirectory, `${options.filePrefix}.mp3`)
    // Handle both RawAudio and Uint8Array types
    if (audio instanceof Uint8Array) {
      await fs.writeFile(outputPath, audio)
    } else {
      logger.info("Audio properties:", Object.keys(audio))
      // @ts-expect-error - audio is a RawAudio object
      await fs.writeFile(outputPath, audio)
    }

    const transcribeFormat = convertTimelineToTranscribeFormat(timeline, text)

    // Save the timeline result
    const timelineOutputPath = path.join(
      outputDirectory,
      `${options.filePrefix}.json`,
    )
    await fs.writeFile(timelineOutputPath, JSON.stringify(transcribeFormat))
  } catch (error) {
    logger.error("Echogarden TTS error:", error)
    throw error
  }
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

function extractWords(timeline: Timeline): TimelineEntry[] {
  const words: TimelineEntry[] = []

  // Process each entry in the timeline
  for (let i = 0; i < timeline.length; i++) {
    const entry = timeline[i]

    if (!entry) continue

    // If it's a word entry, add it to our results
    if (entry.type === "word") {
      words.push(entry)
    }

    // If the entry has a nested timeline, process it recursively
    if (entry.timeline && Array.isArray(entry.timeline)) {
      words.push(...extractWords(entry.timeline))
    }
  }

  return words
}

/**
 * Converts the Echogarden TTS timeline format to the format expected by the transcribe function
 */
function convertTimelineToTranscribeFormat(
  timeline: Timeline,
  originalText: string,
): {
  transcript: string
  wordTimeline: TranscribeFormatWord[]
} {
  // Extract the full transcript
  const transcript = originalText

  // Function to extract all word entries from the timeline

  // Extract all words from the timeline
  const allWords = extractWords(timeline)

  // Process words to add offset information
  let currentOffset = 0
  const wordTimeline: TranscribeFormatWord[] = allWords.map((word) => {
    const trimmedWord = word.text.trim()

    // Find where this word appears in the transcript starting from the current offset
    const wordIndex = transcript.indexOf(trimmedWord, currentOffset)

    // If found, update the offset for next search
    const startOffset = wordIndex !== -1 ? wordIndex : currentOffset
    const endOffset =
      wordIndex !== -1
        ? wordIndex + trimmedWord.length
        : currentOffset + trimmedWord.length

    if (wordIndex !== -1) {
      currentOffset = endOffset
    }

    return {
      type: "word",
      text: trimmedWord,
      startTime: word.startTime,
      endTime: word.endTime,
      score: 1.0, // TTS doesn't have confidence scores, so we use 1.0
      startOffsetUtf16: startOffset,
      endOffsetUtf16: endOffset,
    }
  })

  return {
    transcript,
    wordTimeline,
  }
}
