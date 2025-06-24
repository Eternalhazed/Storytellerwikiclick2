import { getBooks } from "../books"
import * as legacyPaths from "@/assets/legacy/paths"
import * as paths from "@/assets/paths"
import * as legacyCovers from "@/assets/legacy/covers"
import { mkdirSync, renameSync, rmdirSync, rmSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { db } from "../connection"
import { logger } from "@/logging"
import {
  ASSETS_DIR,
  AUDIO_DIR,
  CACHE_DIR,
  DATA_DIR,
  TEXT_DIR,
} from "@/directories"

export default async function migrate() {
  logger.info("Migrating to new directory structure! Welcome to v2!")

  mkdirSync(ASSETS_DIR, { recursive: true })

  const books = await getBooks()

  for (const book of books) {
    logger.info(`Migrating ${book.title}…`)

    const newBookDir = await paths.getBookDirectory(book.uuid)
    try {
      mkdirSync(newBookDir)
      logger.info(`Created parent new folder: ${newBookDir}`)
    } catch (e) {
      logger.error(
        `Failed to create parent folder for book ${book.title} (${book.uuid})`,
      )
      logger.error(e)
      continue
    }

    try {
      mkdirSync(await paths.getEpubDirectory(book.uuid))

      const legacyEpubDir = legacyPaths.getEpubFilepath(book.uuid)
      const newEpubDir = await paths.getEpubFilepath(book.uuid)
      renameSync(legacyEpubDir, newEpubDir)

      await db
        .updateTable("ebook")
        .set({
          filepath: resolve(await paths.getEpubFilepath(book.uuid)),
        })
        .where("bookUuid", "=", book.uuid)
        .execute()

      logger.info("Migrated original ebook")
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped original ebook (missing)")
      } else {
        logger.error(`Failed to migrate original ebook`)
        logger.error(e)
      }
    }

    try {
      const legacyAudioDir = legacyPaths.getOriginalAudioFilepath(book.uuid)
      const newAudioDir = await paths.getAudioDirectory(book.uuid)
      renameSync(legacyAudioDir, newAudioDir)

      await db
        .updateTable("audiobook")
        .set({
          filepath: resolve(await paths.getEpubFilepath(book.uuid)),
        })
        .where("bookUuid", "=", book.uuid)
        .execute()

      logger.info("Migrated original audio files")
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped original audio files (missing)")
      } else {
        logger.error(`Failed to migrate original audio files`)
        logger.error(e)
      }
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
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped transcoded/split audio files (missing)")
      } else {
        logger.error(`Failed to migrate transcoded/split audio files`)
        logger.error(e)
      }
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
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped transcriptions (missing)")
      } else {
        logger.error(`Failed to migrate transcriptions`)
        logger.error(e)
      }
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
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped aligned ebook (missing)")
      } else {
        logger.error(`Failed to migrate aligned ebook`)
        logger.error(e)
      }
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
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped ebook cover (missing)")
      } else {
        logger.error(`Failed to migrate ebook cover`)
        logger.error(e)
      }
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
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped audio cover (missing)")
      } else {
        logger.error(`Failed to migrate audio cover`)
        logger.error(e)
      }
    }

    try {
      const legacyEpubIndex = legacyPaths.getEpubIndexPath(book.uuid)
      const newEpubIndex = await paths.getEpubIndexPath(book.uuid)
      renameSync(legacyEpubIndex, newEpubIndex)

      logger.info("Migrated ebook index file")
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped ebook index file (missing)")
      } else {
        logger.error(`Failed to migrate ebook index file`)
        logger.error(e)
      }
    }

    try {
      const legacyAudioIndex = legacyPaths.getAudioIndexPath(book.uuid)
      const newAudioIndex = await paths.getOriginalAudioFilepath(
        book.uuid,
        ".storyteller-index.json",
      )
      renameSync(legacyAudioIndex, newAudioIndex)

      logger.info("Migrated audio index file")
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped audio index file (missing)")
      } else {
        logger.error(`Failed to migrate audio index file`)
        logger.error(e)
      }
    }

    try {
      rmdirSync(dirname(legacyPaths.getEpubFilepath(book.uuid)))
      rmdirSync(legacyPaths.getEpubSyncedDirectory(book.uuid))
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

  rmSync(CACHE_DIR, { recursive: true, force: true })
  rmSync(join(DATA_DIR, "dict"), { recursive: true, force: true })
}
