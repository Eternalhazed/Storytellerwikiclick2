import fs from "fs"
import path from "path"
import { promisify } from "util"
import { exec } from "child_process"
import { logger } from "@/logging"

const execAsync = promisify(exec)

async function getPythonVersion(command: string): Promise<string | null> {
  try {
    const { stdout } = await execAsync(`${command} --version`)
    return stdout.trim()
  } catch {
    return null
  }
}

// Helper to get virtual environment python path
export function getVenvPythonPath(baseDir: string): string {
  if (process.platform === "win32") {
    return path.join(baseDir, "venv", "Scripts", "python.exe")
  }
  return path.join(baseDir, "venv", "bin", "python")
}

export function getVenvPipPath(venvPath: string): string {
  return process.platform === "win32"
    ? path.join(venvPath, "Scripts", "pip.exe")
    : path.join(venvPath, "bin", "pip")
}

export async function createVirtualEnv(scriptDir: string): Promise<void> {
  const venvPath = path.join(scriptDir, "venv")

  // Check if venv already exists
  if (fs.existsSync(venvPath)) {
    logger.info("Virtual environment already exists")
    return
  }

  const pythonCommands = [
    "python3.12",
    "python3.11",
    "python3.10",
    "python3.9",
    "python3.8",
    "python3", // fallback
  ]

  logger.info("Creating virtual environment...")

  for (const cmd of pythonCommands) {
    const version = await getPythonVersion(cmd)
    if (version) {
      try {
        logger.info(`Using ${version} to create virtual environment`)
        await execAsync(`${cmd} -m venv "${venvPath}"`)
        logger.info("Virtual environment created successfully")
        return
      } catch (error: unknown) {
        logger.warn(
          `Failed to create venv with ${cmd}: ${JSON.stringify(error)}`,
        )
        // Continue to next version
        continue
      }
    }
  }

  throw new Error("No compatible Python version found (3.8-3.12)")
}

export async function installRequirements(scriptDir: string): Promise<void> {
  const venvPath = path.join(scriptDir, "venv")
  const pipPath = getVenvPipPath(venvPath)
  const requirementsPath = path.join(scriptDir, "requirements.txt")

  logger.info("Installing requirements...")
  try {
    await execAsync(`"${pipPath}" install -r "${requirementsPath}"`)
    logger.info("Requirements installed successfully")
  } catch (error) {
    logger.error("Error installing requirements:", error)
    throw error
  }

  return
}
