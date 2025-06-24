import { getBooks } from "../books"
import * as legacyPaths from "@/assets/legacy/paths"
import * as paths from "@/assets/paths"
import * as legacyCovers from "@/assets/legacy/covers"
import { mkdirSync, renameSync, rmdirSync } from "node:fs"
import { join, resolve } from "node:path"
import { db } from "../connection"
import { logger } from "@/logging"
import { AUDIO_DIR, TEXT_DIR } from "@/directories"

export default async function migrate() {
  logger.info("Migrating to new directory structure! Welcome to v2!")

  const books = await getBooks()

  for (const book of books) {
    logger.info(`Migrating ${book.title}…`)

    const newBookDir = await paths.getBookDirectory(book.uuid)
    mkdirSync(newBookDir, { recursive: true })
    logger.info(`Created parent new folder: ${newBookDir}`)

    try {
      mkdirSync(await paths.getEpubDirectory(book.uuid))

      const legacyEpubDir = legacyPaths.getEpubFilepath(book.uuid)
      const newEpubDir = await paths.getEpubFilepath(book.uuid)
      renameSync(legacyEpubDir, newEpubDir)

      await db
        .updateTable("ebook")
        .set({ filepath: resolve(await paths.getEpubFilepath(book.uuid)) })
        .where("bookUuid", "=", book.uuid)
        .execute()

      logger.info("Migrated original ebook")
    } catch {
      logger.info("Skipped original ebook (missing)")
    }

    try {
      const legacyAudioDir = legacyPaths.getOriginalAudioFilepath(book.uuid)
      const newAudioDir = await paths.getAudioDirectory(book.uuid)
      renameSync(legacyAudioDir, newAudioDir)

      await db
        .updateTable("audiobook")
        .set({ filepath: resolve(await paths.getEpubFilepath(book.uuid)) })
        .where("bookUuid", "=", book.uuid)
        .execute()

      logger.info("Migrated original audio files")
    } catch {
      logger.info("Skipped original audio files (missing)")
    }

    try {
      const legacyTranscodedAudioDir = legacyPaths.getProcessedAudioFilepath(
        book.uuid,
      )
      const newTranscodedAudioDir = await paths.getProcessedAudioFilepath(
        book.uuid,
      )
      renameSync(legacyTranscodedAudioDir, newTranscodedAudioDir)

      logger.info("Migrated transcoded/split audio files")
    } catch {
      logger.info("Skipped transcoded/split audio files (missing)")
    }

    try {
      const legacyTranscriptionsDir = legacyPaths.getTranscriptionsFilepath(
        book.uuid,
      )
      const newTranscriptionsDir = await paths.getTranscriptionsFilepath(
        book.uuid,
      )
      renameSync(legacyTranscriptionsDir, newTranscriptionsDir)

      logger.info("Migrated transcriptions")
    } catch {
      logger.info("Skipped transcriptions (missing)")
    }

    try {
      mkdirSync(await paths.getEpubAlignedDirectory(book.uuid))

      const legacyAlignedDir = legacyPaths.getEpubAlignedFilepath(book.uuid)
      const newAlignedDir = await paths.getEpubAlignedFilepath(book.uuid)
      renameSync(legacyAlignedDir, newAlignedDir)

      await db
        .updateTable("alignedBook")
        .set({
          status: "ALIGNED",
          filepath: resolve(await paths.getEpubAlignedFilepath(book.uuid)),
        })
        .where("bookUuid", "=", book.uuid)
        .execute()

      logger.info("Migrated aligned ebook")
    } catch {
      logger.info("Skipped aligned ebook (missing)")
    }

    try {
      const legacyEpubCover = await legacyCovers.getEpubCoverFilepath(book.uuid)
      const epubCoverName = await legacyCovers.getEpubCoverFilename(book.uuid)
      if (legacyEpubCover && epubCoverName) {
        renameSync(
          legacyEpubCover,
          join(await paths.getEpubDirectory(book.uuid), epubCoverName),
        )
      }

      logger.info("Migrated ebook cover")
    } catch {
      logger.info("Skipped ebook cover (missing)")
    }

    try {
      const legacyAudioCover = await legacyCovers.getAudioCoverFilepath(
        book.uuid,
      )
      const audioCoverName = await legacyCovers.getAudioCoverFilename(book.uuid)
      if (legacyAudioCover && audioCoverName) {
        renameSync(
          legacyAudioCover,
          join(await paths.getAudioDirectory(book.uuid), audioCoverName),
        )
      }

      logger.info("Migrated audio cover")
    } catch {
      logger.info("Skipped audio cover (missing)")
    }

    try {
      const legacyEpubIndex = legacyPaths.getEpubIndexPath(book.uuid)
      const newEpubIndex = await paths.getEpubIndexPath(book.uuid)
      renameSync(legacyEpubIndex, newEpubIndex)

      logger.info("Migrated ebook index file")
    } catch {
      logger.info("Skipped ebook index file (missing)")
    }

    try {
      const legacyAudioIndex = legacyPaths.getAudioIndexPath(book.uuid)
      const newAudioIndex = await paths.getOriginalAudioFilepath(
        book.uuid,
        ".storyteller-index.json",
      )
      renameSync(legacyAudioIndex, newAudioIndex)

      logger.info("Migrated audio index file")
    } catch {
      logger.info("Skipped audio index file (missing)")
    }

    try {
      rmdirSync(legacyPaths.getEpubDirectory(book.uuid))
      logger.info("Cleaned up old ebook directory")
    } catch {
      logger.info(
        `Left old ebook directory in place — some content was not migrated: ${legacyPaths.getEpubDirectory(book.uuid)}`,
      )
    }

    try {
      rmdirSync(legacyPaths.getAudioDirectory(book.uuid))
      logger.info("Cleaned up old audio directory")
    } catch {
      logger.info(
        `Left old audio directory in place — some content was not migrated: ${legacyPaths.getAudioDirectory(book.uuid)}`,
      )
    }
  }

  try {
    rmdirSync(TEXT_DIR)
    logger.info("Cleaned up old ebook directory")
  } catch {
    logger.info(
      `Left old ebook directory in place — some content was not migrated: ${TEXT_DIR}`,
    )
  }

  try {
    rmdirSync(AUDIO_DIR)
    logger.info("Cleaned up old audio directory")
  } catch {
    logger.info(
      `Left old audio directory in place — some content was not migrated: ${AUDIO_DIR}`,
    )
  }
}
