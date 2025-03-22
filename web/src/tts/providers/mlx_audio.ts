import { fileURLToPath } from "url"
import path from "path"
import fs from "fs"
import { spawn } from "child_process"
import { logger } from "@/logging"
import { createVirtualEnv, installRequirements } from "../utils/virtualenv"

// Get current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface MLXAudioConfig {
  type: "mlx-audio"
  virtualEnvPath?: string
  maxChunkSize?: number
}

export interface TTSOptions {
  model?: string
  voice?: string
  speed?: number
  langCode?: string
  temperature?: number
  refAudio?: string
  refText?: string
  format?: "wav" | "mp3"
  // Added to specify the filename prefix for the output
  filePrefix?: string
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

export async function textToSpeech(
  prompt: string,
  outputDirectory: string,
  options: TTSOptions = {},
): Promise<void> {
  // Check if the prompt is too long
  if (prompt.length > 2000) {
    logger.warn(
      `Prompt length ${prompt.length} exceeds recommended maximum (2000 characters). This may affect speech quality or cause failures.`,
    )
  }

  // Set default options
  const {
    model = "mlx-community/Kokoro-82M-4bit",
    voice = "af_heart",
    filePrefix = "audio", // Default file prefix
  } = options

  const scriptDir = path.join(__dirname, "mlx-audio")

  // Get the correct Python executable from the virtual environment
  const pythonPath =
    process.platform === "win32"
      ? path.join(scriptDir, "venv", "Scripts", "python.exe")
      : path.join(scriptDir, "venv", "bin", "python")

  // Ensure output directory exists
  await fs.promises.mkdir(outputDirectory, { recursive: true })

  return new Promise((resolve, reject) => {
    // Use spawn instead of exec to avoid shell parsing issues
    // Set the working directory to our output directory so files get saved there
    const pythonProcess = spawn(
      pythonPath,
      [
        "-m",
        "mlx_audio.tts.generate",
        "--text",
        prompt,
        "--model",
        model,
        "--voice",
        voice,
        "--audio_format",
        "mp3",
        "--file_prefix", // Use file_prefix to control the output filename
        filePrefix,
        "--join_audio",
      ],
      {
        cwd: outputDirectory, // This is critical - sets the working directory for the Python process
      },
    )

    let stderrData = ""

    pythonProcess.stdout.on("data", (data) => {
      const output = (data as Buffer).toString()
      logger.info(`MLX Audio output: ${output}`)
    })

    pythonProcess.stderr.on("data", (data) => {
      const errorOutput = (data as Buffer).toString()
      stderrData += errorOutput
      logger.error(`stderr: ${errorOutput}`)
    })

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `Failed to run MLX Audio, exit code: ${code}\n${stderrData}`,
          ),
        )
        return
      }

      resolve()
    })
  })
}
