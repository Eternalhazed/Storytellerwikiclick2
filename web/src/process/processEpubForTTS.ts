import { UUID } from "@/uuid"
import { logger } from "@/logging"
import { getEpubSyncedFilepath } from "@/assets/paths"
import { readEpub } from "@/process/processEpub"
import { Epub } from "@smoores/epub"

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
  maxChunkLength: number = 1000,
): Promise<ProcessedBookForTTS> {
  const epubPath = getEpubSyncedFilepath(bookUuid)
  logger.info(
    `Processing EPUB for TTS: ${epubPath} with max chunk size ${maxChunkLength}`,
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

        // Create chunks from paragraphs
        const chunks: TTSChunk[] = []
        let currentChunk = ""
        let position = 0

        for (const paragraph of paragraphs) {
          if (
            currentChunk.length + paragraph.length + 1 > maxChunkLength &&
            currentChunk.length > 0
          ) {
            chunks.push({
              text: currentChunk,
              chapterIndex: i,
              position: position++,
            })
            currentChunk = ""
          }

          if (paragraph.length > maxChunkLength) {
            if (currentChunk.length > 0) {
              chunks.push({
                text: currentChunk,
                chapterIndex: i,
                position: position++,
              })
              currentChunk = ""
            }

            let remainingText = paragraph
            while (remainingText.length > 0) {
              const sentenceBreakIndex = findSentenceBreak(
                remainingText,
                maxChunkLength,
              )
              const chunkText = remainingText.substring(0, sentenceBreakIndex)

              chunks.push({
                text: chunkText,
                chapterIndex: i,
                position: position++,
              })

              remainingText = remainingText.substring(sentenceBreakIndex).trim()
            }
          } else {
            if (currentChunk.length > 0) {
              currentChunk += " "
            }
            currentChunk += paragraph
          }
        }

        if (currentChunk.length > 0) {
          chunks.push({
            text: currentChunk,
            chapterIndex: i,
            position: position,
          })
        }

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

function findSentenceBreak(text: string, maxLength: number): number {
  if (text.length <= maxLength) {
    return text.length
  }

  const lastPeriod = text.lastIndexOf(".", maxLength)
  const lastExclamation = text.lastIndexOf("!", maxLength)
  const lastQuestion = text.lastIndexOf("?", maxLength)

  const sentenceBreak = Math.max(lastPeriod, lastExclamation, lastQuestion)

  if (sentenceBreak > 0 && sentenceBreak < maxLength - 10) {
    return sentenceBreak + 1
  }

  const lastSpace = text.lastIndexOf(" ", maxLength)
  if (lastSpace > maxLength / 2) {
    return lastSpace + 1
  }

  return maxLength
}
