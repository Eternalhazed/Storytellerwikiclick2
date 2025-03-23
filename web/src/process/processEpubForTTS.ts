import { UUID } from "@/uuid"
import { logger } from "@/logging"
import { getEpubSyncedFilepath } from "@/assets/paths"
import { readEpub } from "@/process/processEpub"
import { Epub } from "@smoores/epub"
import { split } from "sentence-splitter"

export interface TTSChunk {
  text: string
  chapterIndex: number
  position: number
}

export interface ProcessedBookForTTS {
  chapters: Array<{
    href: string
    index: number
    chunks: TTSChunk[]
  }>
}

// Default maximum size for TTS chunks in characters
const DEFAULT_MAX_CHUNK_SIZE = 2000

export async function processEpubForTTS(
  bookUuid: UUID,
  maxChunkSize: number = DEFAULT_MAX_CHUNK_SIZE,
): Promise<ProcessedBookForTTS> {
  const epubPath = getEpubSyncedFilepath(bookUuid)
  logger.info(
    `Processing EPUB for TTS: ${epubPath} using paragraph and sentence-based chunking (max ${maxChunkSize} chars)`,
  )

  try {
    const epub = await readEpub(bookUuid)
    const processedBook: ProcessedBookForTTS = {
      chapters: [],
    }

    const spine = await epub.getSpineItems()
    // Process each spine item (chapter)
    for (let i = 0; i < spine.length; i++) {
      try {
        const section = spine[i]

        logger.info(`Processing chapter ${i} for TTS`)

        if (!section) continue

        // Get chapter XML content and extract body text
        const chapterXml = await epub.readXhtmlItemContents(section.id)
        const textContent = Epub.getXhtmlTextContent(chapterXml)

        // Split text into paragraphs
        const paragraphs = textContent
          .split(/\n+/)
          .map((p) => p.trim())
          .filter((p) => p.length > 0)

        // Create chunks from paragraphs and sentences
        const chunks = createSentenceBasedChunks(paragraphs, i, maxChunkSize)

        logger.info(`Created ${chunks.length} TTS chunks for chapter ${i}`)

        processedBook.chapters.push({
          href: section.href,
          index: i,
          chunks,
        })
      } catch (error) {
        logger.error(
          `Error processing chapter ${i} for TTS: ${error instanceof Error ? error.message : String(error)}`,
        )
      }
    }

    await epub.close()

    logger.info(
      `Completed TTS processing for book. Total chapters: ${processedBook.chapters.length}`,
    )
    return processedBook
  } catch (error) {
    logger.error(
      `Error processing EPUB for TTS: ${error instanceof Error ? error.message : String(error)}`,
    )
    throw error
  }
}

function createSentenceBasedChunks(
  paragraphs: string[],
  chapterIndex: number,
  maxChunkSize: number,
): TTSChunk[] {
  const chunks: TTSChunk[] = []
  let position = 0
  let currentChunk = ""

  // Process each paragraph
  for (const paragraph of paragraphs) {
    // Use sentence-splitter to break paragraph into sentences
    const sentenceNodes = split(paragraph)
    const sentences = sentenceNodes
      .filter((node) => node.type === "Sentence")
      .map((node) => node.raw.trim())
      .filter((sentence) => sentence.length > 0)

    // Process each sentence in the paragraph
    for (const sentence of sentences) {
      // If a single sentence is longer than the max chunk size, we have to include it anyway
      // (we won't break sentences)
      if (sentence.length > maxChunkSize) {
        // If we have content in the current chunk, finalize it first
        if (currentChunk.length > 0) {
          chunks.push({
            text: currentChunk,
            chapterIndex,
            position: position++,
          })
          currentChunk = ""
        }

        // Add the long sentence as its own chunk
        chunks.push({
          text: sentence,
          chapterIndex,
          position: position++,
        })
        continue
      }

      // If adding this sentence would exceed the chunk size limit, finalize the current chunk
      if (
        currentChunk.length > 0 &&
        currentChunk.length + sentence.length + 1 > maxChunkSize
      ) {
        chunks.push({
          text: currentChunk,
          chapterIndex,
          position: position++,
        })
        currentChunk = sentence
      } else {
        // Add the sentence to the current chunk
        if (currentChunk.length > 0) {
          currentChunk += " " + sentence
        } else {
          currentChunk = sentence
        }
      }
    }

    // Add a period and space between paragraphs in the same chunk
    // Only add if the current chunk doesn't already end with a period
    if (currentChunk.length > 0) {
      if (!currentChunk.trim().endsWith(".")) {
        currentChunk += ". "
      } else {
        currentChunk += " "
      }
    }
  }

  // Don't forget to add the final chunk if there's anything left
  if (currentChunk.length > 0) {
    // Ensure the final chunk ends with a period if it doesn't already
    const trimmedChunk = currentChunk.trim()
    if (!trimmedChunk.endsWith(".")) {
      chunks.push({
        text: trimmedChunk + ".",
        chapterIndex,
        position: position++,
      })
    } else {
      chunks.push({
        text: trimmedChunk,
        chapterIndex,
        position: position++,
      })
    }
  }

  return chunks
}
