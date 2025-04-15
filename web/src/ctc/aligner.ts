import { readFile } from "node:fs/promises"
import { basename, dirname, parse, relative } from "node:path/posix"
import memoize from "memoize"
import { Epub, ManifestItem, ParsedXml } from "@smoores/epub"
import { getTrackDuration } from "@/audio"
import { extname } from "node:path"
import { logger } from "@/logging"
import { lookup } from "mime-types"
import { getXHtmlTextblocks } from "../align/getXhtmlBlocks"
import { tagSentences } from "../align/tagSentences"
import { align, SentenceRange } from "./alignPy"

function getChapterDuration(sentenceRanges: SentenceRange[]) {
  const start = sentenceRanges[0]?.start ?? 0
  const end = sentenceRanges.at(-1)?.end ?? 0
  return end - start
}

function createMediaOverlay(
  chapter: ManifestItem,
  sentenceRanges: SentenceRange[],
  audioFilepath: string,
) {
  return [
    {
      ":@": {
        "@_xmlns": "http://www.w3.org/ns/SMIL",
        "@_xmlns:epub": "http://www.idpf.org/2007/ops",
        "@_version": "3.0",
      },
      smil: [
        {
          body: [
            {
              ":@": {
                "@_id": `${chapter.id}_overlay`,
                "@_epub:textref": `../${chapter.href}`,
                "@_epub:type": "chapter",
              },
              seq: sentenceRanges.map((sentenceRange) => ({
                ":@": {
                  "@_id": `${chapter.id}-sentence${sentenceRange.id}`,
                },
                par: [
                  {
                    ":@": {
                      "@_src": `../${chapter.href}#${chapter.id}-sentence${sentenceRange.id}`,
                    },
                    text: [],
                  },
                  {
                    ":@": {
                      "@_src": `../Audio/${basename(audioFilepath)}`,
                      "@_clipBegin": `${sentenceRange.start.toFixed(3)}s`,
                      "@_clipEnd": `${sentenceRange.end.toFixed(3)}s`,
                    },
                    audio: [],
                  },
                ],
              })),
            },
          ],
        },
      ],
    },
  ]
}

type AlignedChapter = {
  chapter: ManifestItem
  xml: ParsedXml
  sentenceRanges: SentenceRange[]
}

export class CtcAligner {
  private totalDuration = 0

  private alignedChapters: AlignedChapter[] = []

  constructor(
    public epub: Epub,
    public audioFilepath: string,
    private emissionsPath: string,
  ) {
    this.getChapterTextblocks = memoize(this.getChapterTextblocks.bind(this))
  }

  private async getChapterTextblocks(chapterId: string) {
    const chapterXml = await this.epub.readXhtmlItemContents(chapterId)

    const blocks = getXHtmlTextblocks(Epub.getXhtmlBody(chapterXml))
    const cleanBlocks = blocks.map((block) => block.replaceAll(/\s+/g, " "))
    return cleanBlocks.join("\n")
  }

  private async writeAudioFile() {
    const { name, base } = parse(this.audioFilepath)
    const ext = extname(base)

    const id = `audio_${name}`

    // Make sure this file hasn't already been added
    // from a previous chapter
    const manifest = await this.epub.getManifest()
    if (id in manifest) return

    const epubAudioFilename = `Audio/${base}`
    const duration = await getTrackDuration(this.audioFilepath)
    this.totalDuration += duration

    const audio = await readFile(this.audioFilepath)

    // The mime-db package does not recognize m4b (jshttp/mime-db#357).
    // It has something for all other audio files we recognize.
    const mediaType = (
      lookup(ext) || (ext === ".m4b" ? "audio/mp4" : undefined)
    )?.replace(/^video/, "audio")
    await this.epub.addManifestItem(
      {
        id,
        href: epubAudioFilename,
        mediaType,
      },
      audio,
    )
  }

  private async writeAlignedChapter(alignedChapter: AlignedChapter) {
    const { chapter, sentenceRanges, xml } = alignedChapter

    const { name: chapterStem } = parse(chapter.href)

    const mediaOverlayId = `${chapter.id}_overlay`
    await this.epub.addManifestItem(
      {
        id: mediaOverlayId,
        href: `MediaOverlays/${chapterStem}.smil`,
        mediaType: "application/smil+xml",
      },
      createMediaOverlay(chapter, sentenceRanges, this.audioFilepath),
      "xml",
    )

    await this.epub.updateManifestItem(chapter.id, {
      ...chapter,
      mediaOverlay: mediaOverlayId,
    })

    await this.epub.writeXhtmlItemContents(chapter.id, xml)

    const chapterDuration = getChapterDuration(sentenceRanges)

    await this.epub.addMetadata({
      type: "meta",
      properties: {
        property: "media:duration",
        refines: `#${mediaOverlayId}`,
      },
      value: Epub.formatSmilDuration(chapterDuration),
    })
  }

  private async alignChapter(chapterId: string, skips: [number, number][]) {
    const manifest = await this.epub.getManifest()
    const chapter = manifest[chapterId]
    if (!chapter)
      throw new Error(
        `Failed to align chapter: could not find chapter with id ${chapterId} in manifest`,
      )
    const chapterXml = await this.epub.readXhtmlItemContents(chapterId)

    const chapterTextblocks = await this.getChapterTextblocks(chapterId)

    const sentenceRanges = await align(
      chapterTextblocks,
      this.emissionsPath,
      await this.epub.getLanguage(),
      skips,
    )

    const multiWordSentences = sentenceRanges.filter(
      (range) => range.text.split(" ").length > 1,
    )
    const guessCount = multiWordSentences.reduce(
      (acc, range) => (range.score < -50 ? acc + 1 : acc),
      0,
    )

    // If more than half of the "found" sentences appear to be guesses,
    // skip this chapter entirely
    if (guessCount >= multiWordSentences.length / 2) return

    const foundAdjacentSentences = sentenceRanges.some((range, i) => {
      const next = sentenceRanges[i + 1]
      if (!next) return false
      return next.start < range.end + 30
    })

    // Similarly, if none of the found sentences appear adjacent
    // to each other, we didn't really find the text of this chapter,
    // so skip.
    if (!foundAdjacentSentences) return

    const tagged = tagSentences(
      chapterId,
      chapterXml,
      sentenceRanges.map(({ text }) => text),
    )

    const storytellerStylesheetUrl = relative(
      dirname(chapter.href),
      "Styles/storyteller-readaloud.css",
    )

    Epub.addLinkToXhtmlHead(tagged, {
      rel: "stylesheet",
      href: storytellerStylesheetUrl,
      type: "text/css",
    })

    return {
      chapter,
      xml: tagged,
      sentenceRanges,
    }
  }

  async alignBook(onProgress?: (progress: number) => void) {
    await this.writeAudioFile()
    const spine = await this.epub.getSpineItems()

    const skips: [number, number][] = []

    for (let index = 0; index < spine.length; index++) {
      onProgress?.(index / spine.length)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const spineItem = spine[index]!

      logger.info(`Aligning epub item #${index} : ${basename(spineItem.href)}`)

      const chapterId = spineItem.id
      const chapterTextblocks = await this.getChapterTextblocks(chapterId)
      if (chapterTextblocks.trim().length === 0) {
        logger.info(`Chapter #${index} has no text; skipping`)
        continue
      }
      if (chapterTextblocks.replaceAll(/\s+/g, " ").split(" ").length < 4) {
        logger.info(`Chapter #${index} is fewer than four words; skipping`)
        continue
      }

      const alignedChapter = await this.alignChapter(chapterId, skips)
      if (alignedChapter) {
        this.alignedChapters.push(alignedChapter)
        for (const range of alignedChapter.sentenceRanges.slice(
          1,
          alignedChapter.sentenceRanges.length - 1,
        )) {
          const lastSkip = skips.at(-1)
          if (!lastSkip || range.start - lastSkip[1] > 5) {
            skips.push([range.start, range.end])
            continue
          }
          lastSkip[1] = range.end
        }
      }
    }

    const sortedRanges = this.alignedChapters
      .toSorted(
        // All chapters have at least one sentence, or they would be skipped
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (a, b) => a.sentenceRanges[0]!.start - b.sentenceRanges[0]!.start,
      )
      .flatMap(({ sentenceRanges }) => sentenceRanges)

    for (let i = 0; i < sortedRanges.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const range = sortedRanges[i]!
      const prevRange = sortedRanges[i - 1]
      if (!prevRange) {
        range.start = 0
        continue
      }

      // The last range in a given chapter is usually aligned
      // with the very last sentence in the audio, even if
      // it's not the last chapter. When we're on the first
      // range in a chapter, fix up the previous range if it
      // exists
      const prevPrevRange = sortedRanges[i - 2]
      if (range.id === 0 && prevPrevRange) {
        prevRange.start = prevPrevRange.end
        prevRange.end = range.start
        continue
      }

      const midpoint = (range.start + prevRange.end) / 2
      range.start = midpoint

      // If we're in the last range, don't fix up
      // the previous range, because the last range is
      // usually aligned incorrectly
      const nextRange = sortedRanges[i + 1]
      if (nextRange?.id !== 0) {
        prevRange.end = midpoint
      }
    }

    const lastRange = sortedRanges.at(-1)
    if (lastRange) {
      lastRange.end = await getTrackDuration(this.audioFilepath)
    }

    for (const alignedChapter of this.alignedChapters) {
      await this.writeAlignedChapter(alignedChapter)
    }

    await this.epub.addMetadata({
      type: "meta",
      properties: { property: "media:duration" },
      value: Epub.formatSmilDuration(this.totalDuration),
    })
    await this.epub.addMetadata({
      type: "meta",
      properties: { property: "media:active-class" },
      value: "-epub-media-overlay-active",
    })
    await this.epub.addManifestItem(
      {
        id: "storyteller_readaloud_styles",
        href: "Styles/storyteller-readaloud.css",
        mediaType: "text/css",
      },
      `
  .-epub-media-overlay-active {
    background-color: #ffb;
  }
        `,
      "utf-8",
    )
  }
}
