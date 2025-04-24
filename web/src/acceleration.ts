import { exec as execCb } from "node:child_process"
import { promisify } from "node:util"
import { logger } from "@/logging"

const exec = promisify(execCb)

export async function installCuda(version: "11.8" | "12.6") {
  logger.info("CUDA enabled; installing cuda toolkit")
  const cudaVersions =
    version === "12.6"
      ? {
          full: "12-6-local_12.6.3-560.35.05-1",
          semver: "12.6.3",
          majorMinor: "12.6",
          short: "12-6",
        }
      : {
          full: "11-8-local_11.8.0-520.61.05-1",
          semver: "11.8.0",
          majorMinor: "11.8",
          short: "11-8",
        }

  try {
    await exec(`dpkg -s cuda-toolkit-${cudaVersions.short}`)
    logger.info(`CUDA toolkit ${cudaVersions.semver} already installed.`)
    return
  } catch {
    /* empty */
  }

  logger.info("Downloading toolkit package (~3GB — this may take a while)")
  await exec(
    `wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin`,
  )
  await exec(
    `mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600`,
  )
  await exec(
    `wget --quiet https://developer.download.nvidia.com/compute/cuda/${cudaVersions.semver}/local_installers/cuda-repo-ubuntu2204-${cudaVersions.full}_amd64.deb`,
  )
  logger.info("Unpacking toolkit package")
  await exec(`dpkg -i cuda-repo-ubuntu2204-${cudaVersions.full}_amd64.deb`)
  await exec(
    `cp /var/cuda-repo-ubuntu2204-${cudaVersions.short}-local/cuda-*-keyring.gpg /usr/share/keyrings/`,
  )
  await exec(`rm cuda-repo-ubuntu2204-${cudaVersions.full}_amd64.deb`)
  await exec("apt update")
  logger.info("Installing toolkit (will also take a while)")
  await exec(`apt-get -y install cuda-toolkit-${cudaVersions.short}`)
  logger.info("Installation complete")

  process.env["PATH"] =
    `/usr/local/cuda-${cudaVersions.majorMinor}/bin:${process.env["PATH"]}`
  process.env["LIBRARY_PATH"] =
    `/usr/local/cuda-${cudaVersions.majorMinor}/lib64/stubs:${process.env["LIBRARY_PATH"]}`
}

export async function installRocm({ includeHipblas = false } = {}) {
  try {
    await exec(`dpkg -s rocm-dev`)
    logger.info(`ROCm already installed.`)
    if (includeHipblas) {
      await exec("dpkg -s hipblas-dev")
      logger.info("hipBLAS already installed.")
    }
    return
  } catch {
    /* Move on to installation if checks fail */
  }

  logger.info(`Installing ROCm${includeHipblas ? " and hipBLAS" : ""}`)
  await exec(
    "curl -sL http://repo.radeon.com/rocm/rocm.gpg.key | apt-key add -",
  )
  await exec(
    'printf "deb [arch=amd64] https://repo.radeon.com/rocm/apt/6.2.1/ jammy main" | tee /etc/apt/sources.list.d/rocm.list',
  )
  await exec(
    'printf "deb [arch=amd64] https://repo.radeon.com/amdgpu/6.2.1/ubuntu jammy main" | tee /etc/apt/sources.list.d/amdgpu.list',
  )
  await exec("apt-get update")
  await exec(
    `apt-get -y install rocm-dev${includeHipblas ? " hipblas-dev" : ""}`,
    {
      env: { ...process.env, DEBIAN_FRONTEND: "noninteractive" },
    },
  )
}
