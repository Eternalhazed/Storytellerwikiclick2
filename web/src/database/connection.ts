import { DATA_DIR } from "@/directories"
import { join } from "node:path"
import { cwd } from "node:process"
import Db, { Database } from "better-sqlite3"
import { logger } from "@/logging"

let db: Database | undefined

const DATABASE_URL = join(DATA_DIR, "storyteller.db")

// FIXME: I had to manually compile a dylib with
//  gcc -dynamiclib -o uuid.c.dylib uuid.c -current_version 1.0 -compatibility_version 1.0 to get this to work on macOS
//  I am not sure what the current_version and compatibility_version mean (AI generated and worked)
const UUID_EXT_PATH = join(cwd(), "sqlite", "uuid.c")

export function getDatabase(): Database {
  if (db) return db

  db = new Db(
    DATABASE_URL,
    process.env["SQLITE_NATIVE_BINDING"]
      ? {
          nativeBinding: process.env["SQLITE_NATIVE_BINDING"],
        }
      : undefined,
  )
  db.pragma("journal_mode = WAL")
  try {
    db.loadExtension(UUID_EXT_PATH)
  } catch (e) {
    logger.error(e)
  }
  return db
}
