import fs from "fs"
import path from "path"
import { promisify } from "util"
import { exec } from "child_process"
import { logger } from "@/logging"

const execAsync = promisify(exec)

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

  logger.info("Creating virtual environment...")
  try {
    await execAsync(`python3 -m venv "${venvPath}"`)
    logger.info("Virtual environment created successfully")
  } catch (error) {
    logger.error("Error creating virtual environment:", error)
    throw error
  }

  return
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
