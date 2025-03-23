import { fileURLToPath } from "url"
import path from "path"
import fs from "fs"
import { spawn } from "child_process"
import { logger } from "@/logging"
import { createVirtualEnv, installRequirements } from "../utils/virtualenv"
import { KokoroTTSOptions, OrpheusTTSOptions } from "../types"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export enum MLXModel {
  KOKORO = "mlx-community/Kokoro-82M-4bit",
  ORPHEUS = "mlx-community/orpheus-3b-0.1-ft-bf16",
}

type ModelOptions = {
  [MLXModel.KOKORO]: KokoroTTSOptions
  [MLXModel.ORPHEUS]: OrpheusTTSOptions
}

interface ModelDefaults {
  voice: string
  lang_code?: string
  temperature?: number
  top_p?: number
  top_k?: number
  repetition_penalty?: number
}

export async function initializeMLXAudio(): Promise<void> {
  const scriptDir = path.join(__dirname, "mlx-audio")
  try {
    await createVirtualEnv(scriptDir)
    await installRequirements(scriptDir)
  } catch (error) {
    logger.error("Failed to initialize MLX Audio:", error)
    throw error
  }
}

export async function textToSpeech<T extends MLXModel>(
  text: string,
  outputDirectory: string,
  model: T,
  options: ModelOptions[T],
): Promise<void> {
  if (!options.filePrefix) {
    throw new Error("filePrefix is required for MLX Audio output")
  }

  // Model-specific defaults
  const modelDefaults: Record<MLXModel, ModelDefaults> = {
    [MLXModel.KOKORO]: {
      voice: "af_heart",
      lang_code: "en",
    },
    [MLXModel.ORPHEUS]: {
      voice: "tara",
      temperature: 0.6,
      top_p: 0.9,
      top_k: 50,
      repetition_penalty: 1.1,
    },
  }

  // Merge defaults with provided options
  const mergedOptions = {
    ...modelDefaults[model],
    ...options,
  }

  const scriptDir = path.join(__dirname, "mlx-audio")
  const pythonPath = path.join(scriptDir, "venv", "bin", "python")

  await fs.promises.mkdir(outputDirectory, { recursive: true })

  // Base arguments that are always included
  const baseArgs: Record<string, string | boolean> = {
    text,
    model,
    audio_format: "mp3",
    file_prefix: mergedOptions.filePrefix,
    join_audio: true,
  }

  // Combine base args with model-specific options
  const args = Object.entries({ ...baseArgs, ...mergedOptions })
    .filter(([key]) => !["filePrefix"].includes(key)) // Remove filePrefix as it's handled by file_prefix
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) =>
      typeof value === "boolean" ? `--${key}` : [`--${key}`, String(value)],
    )
    .flat()

  logger.info(
    `Generating TTS audio for ${model} with options: ${JSON.stringify(args)}`,
  )
  return new Promise((resolve, reject) => {
    const process = spawn(
      pythonPath,
      ["-m", "mlx_audio.tts.generate", ...args],
      { cwd: outputDirectory },
    )

    let stderr = ""

    process.stdout.on("data", (data: Buffer) => {
      logger.info(`MLX Audio: ${data.toString()}`)
    })

    process.stderr.on("data", (data: Buffer) => {
      stderr += data.toString()
      logger.error(`MLX Audio error: ${data.toString()}`)
    })

    process.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`MLX Audio failed (${code}): ${stderr}`))
      }
    })
  })
}
