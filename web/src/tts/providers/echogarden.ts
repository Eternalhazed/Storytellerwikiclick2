import * as Echogarden from "echogarden"
import { VoiceGender } from "echogarden"
import { logger } from "@/logging"
import { BaseTTSOptions } from "../types"
import path from "path"
import fs from "fs/promises"

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

  // Default options
  const defaultOptions = {
    kokoroModel: "82m-v1.0-fp32" as const,
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
    const { audio } = await Echogarden.synthesize(
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
  } catch (error) {
    logger.error("Echogarden TTS error:", error)
    throw error
  }
}
