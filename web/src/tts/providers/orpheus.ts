import { PythonShell, Options } from "python-shell"
import path from "path"
import { fileURLToPath } from "url"
import ffmpeg from "fluent-ffmpeg"
import fs from "fs"
import { promisify } from "util"
import { exec } from "child_process"
import { logger } from "@/logging"

const execAsync = promisify(exec)

// Get current directory using import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export interface OrpheusTTSConfig {
  type: "orpheus"
  virtualEnvPath?: string
}

export interface TTSOptions {
  voice?: string
  temperature?: number
  topP?: number
  repetitionPenalty?: number
  format?: "wav" | "mp3"
}

// Helper to get virtual environment python path
function getVenvPythonPath(baseDir: string): string {
  if (process.platform === "win32") {
    return path.join(baseDir, "venv", "Scripts", "python.exe")
  }
  return path.join(baseDir, "venv", "bin", "python")
}

export async function initializeOrpheus(): Promise<void> {
  const scriptDir = path.join(__dirname, "orpheus-tts-local")
  const venvPath = path.join(scriptDir, "venv")

  // Check if venv already exists
  if (!fs.existsSync(venvPath)) {
    logger.info("Creating virtual environment for Orpheus TTS...")

    try {
      // Create virtual environment using exec instead of PythonShell
      await execAsync(`python3 -m venv "${venvPath}"`)
      logger.info("Virtual environment created successfully")

      // Install requirements using the venv pip
      const pipPath =
        process.platform === "win32"
          ? path.join(venvPath, "Scripts", "pip.exe")
          : path.join(venvPath, "bin", "pip")

      logger.info("Installing requirements...")
      await execAsync(
        `"${pipPath}" install -r "${path.join(scriptDir, "requirements.txt")}"`,
      )
      logger.info("Requirements installed successfully")
    } catch (error) {
      console.error("Error setting up virtual environment:", error)
      throw error
    }
  }
}

export async function textToSpeech(
  prompt: string,
  outputFile: string,
  // config: OrpheusTTSConfig,
  options: TTSOptions = {},
): Promise<void> {
  // Set default options
  const {
    voice = "tara",
    temperature = 0.6,
    topP = 0.9,
    repetitionPenalty = 1.1,
    format = "wav",
  } = options

  const scriptDir = path.join(__dirname, "orpheus-tts-local")

  // Ensure output directory exists
  const outputDir = path.dirname(outputFile)
  await fs.promises.mkdir(outputDir, { recursive: true })

  // Construct arguments for Python script
  const pythonArgs = [
    "--text",
    prompt,
    "--voice",
    voice,
    "--output",
    outputFile,
    "--temperature",
    temperature.toString(),
    "--top_p",
    topP.toString(),
    "--repetition_penalty",
    repetitionPenalty.toString(),
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
    PythonShell.run("gguf_orpheus.py", pythonOptions)
      .then(async (messages: string[]) => {
        // Check if output file was created
        if (!messages.some((msg) => msg.includes("Audio saved to"))) {
          reject(new Error("Failed to generate audio file"))
          return
        }

        // If MP3 format is requested, convert WAV to MP3
        if (format === "mp3" && outputFile.endsWith(".wav")) {
          const mp3Output = outputFile.replace(".wav", ".mp3")

          await new Promise((resolve, reject) => {
            ffmpeg(outputFile)
              .toFormat("mp3")
              .on("error", (error: Error) => {
                reject(error)
              })
              .on("end", () => {
                resolve(null)
              })
              .save(mp3Output)
          })

          // Remove the WAV file
          await fs.promises.unlink(outputFile)
        }

        resolve()
      })
      .catch((err: unknown) => {
        reject(new Error(`Failed to run Python script: ${String(err)}`))
      })
  })
}
