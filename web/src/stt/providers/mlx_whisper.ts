import { fileURLToPath } from "url"
import path from "path"
import fs from "fs"
import { spawn } from "child_process"
import { logger } from "@/logging"
import { createVirtualEnv, installRequirements } from "@/tts/utils/virtualenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface MLXWhisperOptions {
  // Model options
  model: string

  // Output options
  outputDir?: string
  outputName?: string
  outputFormat?: "txt" | "vtt" | "srt" | "tsv" | "json" | "all"

  // Task options
  task?: "transcribe" | "translate"
  language?: string

  // Decoding options
  temperature?: number
  bestOf?: number
  patience?: number
  lengthPenalty?: number
  suppressTokens?: string
  initialPrompt?: string | undefined // Allow undefined explicitly
  conditionOnPreviousText?: boolean
  fp16?: boolean

  // Quality thresholds
  compressionRatioThreshold?: number
  logprobThreshold?: number
  noSpeechThreshold?: number

  // Word timestamp options
  wordTimestamps?: "True" | "False"
  prependPunctuations?: string
  appendPunctuations?: string
  highlightWords?: boolean
  maxLineWidth?: number
  maxLineCount?: number
  maxWordsPerLine?: number
  hallucinationSilenceThreshold?: number
  clipTimestamps?: string
}

// Interface for the parsed JSON output from MLX Whisper
export interface MLXWhisperResult {
  text: string
  segments: Array<{
    id: number
    seek: number
    start: number
    end: number
    text: string
    tokens: number[]
    temperature: number
    avg_logprob: number
    compression_ratio: number
    no_speech_prob: number
    words?: Array<{
      word: string
      start: number
      end: number
      probability: number
    }>
  }>
  language: string
}

export async function initializeMLXWhisper(): Promise<void> {
  const scriptDir = path.join(__dirname, "mlx-whisper")
  try {
    await createVirtualEnv(scriptDir)
    await installRequirements(scriptDir)
  } catch (error) {
    logger.error("Failed to initialize MLX Whisper:", error)
    throw error
  }
}

export async function transcribeWithMLX(
  audioFile: string,
  options: MLXWhisperOptions,
): Promise<MLXWhisperResult> {
  const scriptDir = path.join(__dirname, "mlx-whisper")
  const mlxWhisperPath = path.join(scriptDir, "venv", "bin", "mlx_whisper")

  await fs.promises.mkdir(options.outputDir || ".", { recursive: true })

  // Start with the audio file
  const args = [audioFile]

  // Add all options as command line arguments
  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined) return

    // Convert camelCase to kebab-case
    const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()

    // Handle boolean values
    if (typeof value === "boolean") {
      args.push(`--${kebabKey}`, value.toString())
    }
    // Handle other values
    else {
      args.push(`--${kebabKey}`, String(value))
    }
  })

  logger.info(`Transcribing audio with MLX Whisper: ${JSON.stringify(args)}`)

  return new Promise((resolve, reject) => {
    // Use the mlx_whisper executable directly instead of python -m
    const process = spawn(mlxWhisperPath, args)

    let stderr = ""

    process.stdout.on("data", (data: Buffer) => {
      logger.info(`MLX Whisper: ${data.toString().trim()}`)
    })

    process.stderr.on("data", (data: Buffer) => {
      stderr += data.toString()
      logger.error(`MLX Whisper error: ${data.toString().trim()}`)
    })

    process.on("close", async (code) => {
      if (code === 0) {
        try {
          // Read the JSON output file
          const outputPath = path.join(
            options.outputDir || ".",
            `${options.outputName || path.basename(audioFile, path.extname(audioFile))}.json`,
          )

          const jsonData = await fs.promises.readFile(outputPath, "utf-8")
          const result = JSON.parse(jsonData) as MLXWhisperResult
          resolve(result)
        } catch (error) {
          reject(
            new Error(`Failed to parse MLX Whisper output: ${String(error)}`),
          )
        }
      } else {
        reject(new Error(`MLX Whisper failed (${code}): ${stderr}`))
      }
    })
  })
}

export default {
  initializeMLXWhisper,
  transcribeWithMLX,
}
