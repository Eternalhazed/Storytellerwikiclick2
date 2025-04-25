import { Epub, ParsedXml } from "@smoores/epub"
import { BLOCKS } from "./semantics"

export function getXHtmlTextblocks(xml: ParsedXml): string[] {
  const blocks: string[] = []
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
    blocks.push(stagedText)
    stagedText = ""
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    blocks.push(...getXHtmlTextblocks(child[childName]!))
  }

  blocks.push(stagedText)

  return blocks
}
