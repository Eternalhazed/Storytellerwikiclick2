import { PythonShell, Options } from "python-shell"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import { logger } from "@/logging"
import { createVirtualEnv, installRequirements } from "../utils/virtualenv"
import { convertWavToMp3 } from "../utils/audioFormat"

// Get current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface MLXAudioConfig {
  type: "mlx-audio"
  virtualEnvPath?: string
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
}

// Helper to get virtual environment python path
function getVenvPythonPath(baseDir: string): string {
  if (process.platform === "win32") {
    return path.join(baseDir, "venv", "Scripts", "python.exe")
  }
  return path.join(baseDir, "venv", "bin", "python")
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
  outputFile: string,
  options: TTSOptions = {},
): Promise<void> {
  // Set default options
  const {
    model = "mlx-community/Kokoro-82M-4bit",
    voice = "af_heart",
    speed = 1.0,
    langCode = "a",
    format = "wav",
  } = options

  const scriptDir = path.join(__dirname, "mlx-audio")

  // Ensure output directory exists
  const outputDir = path.dirname(outputFile)
  await fs.promises.mkdir(outputDir, { recursive: true })

  // Extract file prefix and format from output file
  const filePrefix = outputFile.replace(/\.[^/.]+$/, "")

  // Construct arguments for Python script
  const pythonArgs = [
    "--text",
    prompt,
    "--model",
    model,
    "--voice",
    voice,
    "--speed",
    speed.toString(),
    "--lang_code",
    langCode,
    "--file_prefix",
    filePrefix,
    "--audio_format",
    "wav", // Always output as WAV initially
  ]

  // Configure PythonShell options
  const pythonOptions: Options = {
    mode: "text",
    pythonPath: getVenvPythonPath(scriptDir),
    pythonOptions: ["-u"],
    scriptPath: scriptDir,
    args: pythonArgs,
  }

  return new Promise((resolve, reject) => {
    PythonShell.run("generate.py", pythonOptions)
      .then(async (messages: string[]) => {
        // Check if output file was created by looking for success message
        logger.info(messages)
        if (
          !messages.some((msg) => msg.includes("Audio successfully generated"))
        ) {
          reject(new Error("Failed to generate audio file"))
          return
        }

        const wavFile = `${filePrefix}.wav`

        // If MP3 format is requested, convert WAV to MP3
        if (format === "mp3") {
          try {
            await convertWavToMp3(wavFile, true)
          } catch (error) {
            logger.error("Error converting WAV to MP3:", error)
            reject(new Error(String(error)))
            return
          }
        }

        resolve()
      })
      .catch((err: unknown) => {
        reject(new Error(`Failed to run Python script: ${String(err)}`))
      })
  })
}
