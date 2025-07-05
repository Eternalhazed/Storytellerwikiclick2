import { getBooks, updateBook } from "../books"
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

  for (let book of books) {
    logger.info(`Migrating ${book.title}…`)

    let newBookDir = paths.getInternalBookDirectory(book)
    try {
      mkdirSync(newBookDir)
      logger.info(`Created parent new folder: ${newBookDir}`)
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "EEXIST") {
        book = await updateBook(book.uuid, {
          suffix: paths.getDefaultSuffix(book.uuid),
        })
        newBookDir = paths.getInternalBookDirectory(book)
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
      } else {
        logger.error(
          `Failed to create parent folder for book ${book.title} (${book.uuid})`,
        )
        logger.error(e)
        continue
      }
    }

    try {
      mkdirSync(paths.getInternalEpubDirectory(book))

      const legacyEpubFilepath = legacyPaths.getEpubFilepath(book.uuid)
      const newEpubFilepath = paths.getInternalEpubFilepath(book)
      renameSync(legacyEpubFilepath, newEpubFilepath)

      await db
        .updateTable("ebook")
        .set({
          filepath: resolve(paths.getInternalEpubFilepath(book)),
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
      const newAudioDir = paths.getInternalAudioDirectory(book)
      renameSync(legacyAudioDir, newAudioDir)

      await db
        .updateTable("audiobook")
        .set({
          filepath: resolve(paths.getInternalEpubFilepath(book)),
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
      const newTranscodedAudioDir = paths.getProcessedAudioFilepath(book)
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
      const newTranscriptionsDir = paths.getTranscriptionsFilepath(book)
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
      mkdirSync(paths.getInternalEpubAlignedDirectory(book))

      const legacyAlignedDir = legacyPaths.getEpubAlignedFilepath(book.uuid)
      const newAlignedDir = paths.getInternalEpubAlignedFilepath(book)
      renameSync(legacyAlignedDir, newAlignedDir)

      await db
        .updateTable("alignedBook")
        .set({
          status: "ALIGNED",
          filepath: resolve(paths.getInternalEpubAlignedFilepath(book)),
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
          join(paths.getInternalEpubDirectory(book), epubCoverName),
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
          join(paths.getInternalAudioDirectory(book), audioCoverName),
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
      rmSync(legacyEpubIndex)

      logger.info("Deleted ebook index file")
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped ebook index file (missing)")
      } else {
        logger.error(`Failed to delete ebook index file`)
        logger.error(e)
      }
    }

    try {
      const legacyAudioIndex = legacyPaths.getAudioIndexPath(book.uuid)
      rmSync(legacyAudioIndex)

      logger.info("Deleted audio index file")
    } catch (e) {
      if (e instanceof Error && "code" in e && e.code === "ENOENT") {
        logger.info("Skipped audio index file (missing)")
      } else {
        logger.error(`Failed to delete audio index file`)
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
