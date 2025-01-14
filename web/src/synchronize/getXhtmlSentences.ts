import { Epub, ParsedXml } from "@smoores/epub"
import { tokenizeSentences } from "./nlp"
import { BLOCKS } from "./semantics"

export function getXHtmlSentences(
  xml: ParsedXml,
  locale: Intl.Locale,
): string[] {
  const sentences: string[] = []
  let stagedText = ""
  for (const child of xml) {
    if (Epub.isXmlTextNode(child)) {
      stagedText += child["#text"]
      continue
    }
    const childName = Epub.getXmlElementName(child)
    if (!BLOCKS.includes(childName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      stagedText += Epub.getXhtmlTextContent(child[childName]!)
      continue
    }
    sentences.push(...tokenizeSentences(stagedText, locale))
    stagedText = ""
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sentences.push(...getXHtmlSentences(child[childName]!, locale))
  }

  sentences.push(...tokenizeSentences(stagedText, locale))

  return sentences
}
