import { getBook } from "@/database/books"
import { ASSETS_DIR } from "@/directories"
import { UUID } from "@/uuid"
import memoize from "memoize"
import { join } from "node:path"

const base62Chars =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function base62Encode(bytes: Uint8Array): string {
  let num = BigInt(0)
  for (const byte of bytes) {
    num = (num << 8n) | BigInt(byte)
  }

  let result = ""
  while (num > 0n) {
    // @ts-expect-error Typescript thinks that you can't use a bigint as an index
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    result = base62Chars[num % 62n] + result
    num /= 62n
  }

  return result.padStart(8, "0") // Ensure fixed length if desired
}

function shortenUuid(uuid: string, numBytes = 6): string {
  const hex = uuid.replace(/-/g, "")
  const bytes = new Uint8Array(numBytes)
  for (let i = 0; i < numBytes; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return base62Encode(bytes)
}

function sanitizeFilename(title: string): string {
  return title
    .replace(/[/\\:*?"<>|]/g, "-") // Windows illegal chars
    .replace(/\s+/g, " ") // normalize whitespace
    .trim()
    .replace(/[. ]+$/, "") // no trailing dot or space
}

function truncate(input: string, byteLimit: number, suffix = ""): string {
  const normalized = input.normalize("NFC") // ensure consistent encoding
  const encoder = new TextEncoder()

  let result = ""
  for (const char of normalized) {
    const withSuffix = result + char + suffix
    const byteLength = encoder.encode(withSuffix).length

    if (byteLength > byteLimit) break
    result += char
  }

  return result + suffix
}

export const getBookFilename = memoize(
  async function getBookFilename(bookUuid: UUID, suffix: string = "") {
    const book = await getBook(bookUuid)
    if (!book) {
      throw new Error(
        `Failed to get EPUB directory for book ${bookUuid} — book does not exist`,
      )
    }

    return truncate(sanitizeFilename(book.title), 150, suffix)
  },
  { cacheKey: (args) => `${args[0]}${args[1]}` },
)

export async function getBookDirectory(bookUuid: UUID) {
  const shortid = shortenUuid(bookUuid)
  const filename = await getBookFilename(bookUuid, ` [${shortid}]`)
  return join(ASSETS_DIR, filename)
}

export async function getEpubDirectory(bookUuid: UUID) {
  return join(await getBookDirectory(bookUuid), "text")
}

export async function getEpubAlignedDirectory(bookUuid: UUID) {
  return join(await getBookDirectory(bookUuid), "aligned")
}

export async function getEpubAlignedFilepath(bookUuid: UUID) {
  return join(
    await getEpubAlignedDirectory(bookUuid),
    await getBookFilename(bookUuid, ".epub"),
  )
}

export async function getEpubFilepath(bookUuid: UUID) {
  return join(
    await getEpubDirectory(bookUuid),
    await getBookFilename(bookUuid, ".epub"),
  )
}

export async function getEpubIndexPath(bookUuid: UUID) {
  return join(await getEpubDirectory(bookUuid), ".storyteller-index.json")
}

export async function getAudioDirectory(bookUuid: UUID) {
  return join(await getBookDirectory(bookUuid), "audio")
}

export async function getAudioIndexPath(bookUuid: UUID) {
  return join(await getAudioDirectory(bookUuid), ".storyteller-index.json")
}

export async function getOriginalAudioFilepath(bookUuid: UUID, filename = "") {
  return join(await getAudioDirectory(bookUuid), filename)
}

export async function getProcessedAudioFilepath(bookUuid: UUID, filename = "") {
  return join(await getBookDirectory(bookUuid), "transcoded audio", filename)
}

export async function getTranscriptionsFilepath(bookUuid: UUID, filename = "") {
  return join(await getBookDirectory(bookUuid), "transcriptions", filename)
}
