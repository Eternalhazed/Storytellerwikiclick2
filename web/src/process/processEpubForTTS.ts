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

export async function processEpubForTTS(
  bookUuid: UUID,
): Promise<ProcessedBookForTTS> {
  const epubPath = getEpubSyncedFilepath(bookUuid)
  logger.info(
    `Processing EPUB for TTS: ${epubPath} using sentence-level chunking`,
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

        const chunks = createSentenceChunks(paragraphs, i)

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

function createSentenceChunks(
  paragraphs: string[],
  chapterIndex: number,
): TTSChunk[] {
  const chunks: TTSChunk[] = []
  let position = 0

  for (const paragraph of paragraphs) {
    // Use sentence-splitter to split paragraph into sentences
    const sentenceNodes = split(paragraph)
    const sentences = sentenceNodes
      .filter((node) => node.type === "Sentence")
      .map((node) => node.raw)

    // Each sentence becomes its own chunk
    for (const sentence of sentences) {
      // Only create chunks for non-empty sentences
      if (sentence.trim().length > 0) {
        chunks.push({
          text: sentence.trim(),
          chapterIndex,
          position: position++,
        })
      }
    }
  }

  return chunks
}
