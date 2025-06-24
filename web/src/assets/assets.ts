import { copyFile, mkdir, readdir, rm, stat, symlink } from "node:fs/promises"
import { UUID } from "../uuid"
import { getSyncCachePath } from "../synchronize/syncCache"
import { basename, dirname, extname } from "node:path"
import { isAudioFile } from "../audio"
import {
  getEpubFilepath,
  getEpubDirectory,
  getAudioDirectory,
  getOriginalAudioFilepath,
  getProcessedAudioFilepath,
  getTranscriptionsFilepath,
} from "./paths"

export async function linkEpub(bookUuid: UUID, origin: string) {
  const filepath = await getEpubFilepath(bookUuid)
  const directory = dirname(filepath)
  await mkdir(directory, { recursive: true })
  await symlink(origin, filepath)
}

export async function persistEpub(bookUuid: UUID, tmpPath: string) {
  const filepath = await getEpubFilepath(bookUuid)
  const directory = dirname(filepath)
  await mkdir(directory, { recursive: true })
  await copyFile(tmpPath, filepath)
  await rm(tmpPath)
}

export async function linkAudio(bookUuid: UUID, origins: string[]) {
  await Promise.all(
    origins.map(async (origin) => {
      const base = basename(origin)
      const filepath = await getOriginalAudioFilepath(bookUuid, base)
      const directory = dirname(filepath)
      await mkdir(directory, { recursive: true })

      await symlink(origin, filepath)
    }),
  )
}

export async function persistAudio(bookUuid: UUID, audioPaths: string[]) {
  await Promise.all(
    audioPaths.map(async (path) => {
      const filename = basename(path)
      const filepath = await getOriginalAudioFilepath(bookUuid, filename)
      const directory = dirname(filepath)
      await mkdir(directory, { recursive: true })
      await copyFile(path, filepath)
      await rm(path)
    }),
  )
}

export async function originalEpubExists(bookUuid: UUID) {
  try {
    await stat(await getEpubFilepath(bookUuid))
    return true
  } catch {
    return false
  }
}

export async function originalAudioExists(bookUuid: UUID) {
  const originalAudioDirectory = await getOriginalAudioFilepath(bookUuid)
  try {
    const filenames = await readdir(originalAudioDirectory)

    return filenames.some((filename) => {
      const ext = extname(filename)
      return ext === ".zip" || isAudioFile(ext)
    })
  } catch {
    return false
  }
}

export async function deleteProcessed(bookUuid: UUID) {
  await Promise.all([
    rm(await getProcessedAudioFilepath(bookUuid), {
      recursive: true,
      force: true,
    }),
    rm(await getTranscriptionsFilepath(bookUuid), {
      recursive: true,
      force: true,
    }),
    rm(getSyncCachePath(bookUuid), { force: true }),
  ])
}

export async function deleteOriginals(bookUuid: UUID) {
  await Promise.all([
    rm(await getEpubFilepath(bookUuid), { force: true }),
    rm(await getOriginalAudioFilepath(bookUuid), {
      recursive: true,
      force: true,
    }),
  ])
}

export async function deleteAssets(bookUuid: UUID) {
  await Promise.all([
    rm(await getEpubDirectory(bookUuid), { recursive: true, force: true }),
    rm(await getAudioDirectory(bookUuid), { recursive: true, force: true }),
    rm(getSyncCachePath(bookUuid), { force: true }),
  ])
}
