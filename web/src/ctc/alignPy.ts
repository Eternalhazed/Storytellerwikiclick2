import {
  exec as execCb,
  spawn,
  SpawnOptionsWithoutStdio,
} from "node:child_process"
import { promisify } from "node:util"
import { iso6393 } from "iso-639-3"
import { existsSync } from "node:fs"
import { logger } from "@/logging"
import { Settings } from "@/database/settings"
import { installCuda, installRocm } from "@/acceleration"

const exec = promisify(execCb)

function getIso6393Lang(locale: Intl.Locale) {
  return iso6393.find((lang) => lang.iso6391 === locale.language)?.iso6393
}

async function installCtc(settings: Settings) {
  if (settings.ctcBuild === "rocm") {
    await installRocm()

    // TODO: Check whether rocm torch is already installed with pip show torch
    logger.info("Downloading PyTorch dependencies from the Radeon repo")
    await exec(
      `wget -nv https://repo.radeon.com/rocm/manylinux/rocm-rel-6.3.4/torch-2.4.0%2Brocm6.3.4.git7cecbf6d-cp310-cp310-linux_x86_64.whl`,
    )
    await exec(
      `wget -nv https://repo.radeon.com/rocm/manylinux/rocm-rel-6.3.4/pytorch_triton_rocm-3.0.0%2Brocm6.3.4.git75cc27c2-cp310-cp310-linux_x86_64.whl`,
    )
    await exec(
      `wget -nv https://repo.radeon.com/rocm/manylinux/rocm-rel-6.3.4/torchaudio-2.4.0%2Brocm6.3.4.git69d40773-cp310-cp310-linux_x86_64.whl`,
    )
    logger.info("Installing PyTorch dependencies")
    await exec(`pip uninstall -y torch torchaudio triton`)
    await exec(
      `pip install torch-2.4.0+rocm6.3.4.git7cecbf6d-cp310-cp310-linux_x86_64.whl torchaudio-2.4.0+rocm6.3.4.git69d40773-cp310-cp310-linux_x86_64.whl pytorch_triton_rocm-3.0.0+rocm6.3.4.git75cc27c2-cp310-cp310-linux_x86_64.whl`,
    )
    logger.info("ROCm PyTorch dependencies installed")
  }
  if (settings.ctcBuild === "cuda-11.8") {
    await installCuda("11.8")
    logger.info("Installing CUDA PyTorch dependencies")
    await exec(`pip uninstall -y torch torchaudio triton`)
    await exec(
      `pip install torch triton torchaudio --index-url https://download.pytorch.org/whl/cu118`,
    )
    logger.info("CUDA PyTorch dependencies installed")
  }
  if (settings.ctcBuild === "cuda-12.6") {
    await installCuda("12.6")
    logger.info("Installing CUDA PyTorch dependencies")
    await exec(`pip uninstall -y torch torchaudio triton`)
    await exec(
      `pip install torch triton torchaudio --index-url https://download.pytorch.org/whl/cu126`,
    )
    logger.info("CUDA PyTorch dependencies installed")
  }
  if (settings.ctcBuild === "cpu") {
    logger.info("Installing CPU PyTorch dependencies")
    await exec(`pip uninstall -y torch torchaudio triton`)
    await exec(
      `pip install torch triton torchaudio --index-url https://download.pytorch.org/whl/cpu`,
    )
    logger.info("CPU PyTorch dependencies installed")
  }

  logger.info(
    "Installing ctc_forced_aligner from GitHub (this may take a few minutes)",
  )
  await exec(
    `pip install git+https://github.com/MahmoudAshraf97/ctc-forced-aligner.git`,
  )
  logger.info("ctc_forced_aligner installed")
}

export async function generateEmmisions(
  audioPath: string,
  locale: Intl.Locale,
  outputPath: string,
  settings: Settings,
) {
  if (existsSync(outputPath)) return

  await installCtc(settings)

  const iso6393Lang = getIso6393Lang(locale)

  await exec(
    [
      "./align_py/generate_emissions.py",
      "-i",
      audioPath,
      ...(iso6393Lang ? ["--lang", iso6393Lang] : []),
      "-o",
      outputPath,
    ].join(" "),
  )
}

function spawnWithStreams(
  command: string,
  args: string[] = [],
  options: SpawnOptionsWithoutStdio = {},
) {
  const child = spawn(command, args, {
    stdio: "pipe", // Default, ensures stdin, stdout, stderr are streams
    ...options,
  })

  let stdout = ""
  let stderr = ""

  child.stdout.on("data", (data: Buffer) => {
    stdout += data.toString()
  })

  child.stderr.on("data", (data: Buffer) => {
    stderr += data.toString()
  })

  const promise = new Promise<{
    code: number | null
    stdout: string
    stderr: string
  }>((resolve, reject) => {
    child.on("error", (err) => {
      reject(err)
    })

    child.on("close", (code) => {
      resolve({
        code,
        stdout,
        stderr,
      })
    })
  })

  // Attach the child process directly so you can interact immediately
  return Object.assign(promise, { child })
}

export interface SentenceRange {
  id: number
  start: number
  end: number
  text: string
  score: number
}

export async function align(
  text: string,
  emissionsPath: string,
  locale: Intl.Locale | null,
  skips: [number, number][],
) {
  const iso6393Lang = locale && getIso6393Lang(locale)

  const p = spawnWithStreams("./align_py/align.py", [
    "-e",
    emissionsPath,
    ...(iso6393Lang ? ["--lang", iso6393Lang] : []),
    ...(skips.length
      ? ["--skip", skips.map(([from, to]) => `${from}:${to}`).join(",")]
      : []),
  ])

  p.child.stdin.write(text)
  p.child.stdin.end()

  const { code, stderr, stdout } = await p
  if (code) throw new Error(stderr)
  const ranges = JSON.parse(stdout) as Omit<SentenceRange, "id">[]
  return ranges.map((range, id) => ({ id, ...range }))
}
