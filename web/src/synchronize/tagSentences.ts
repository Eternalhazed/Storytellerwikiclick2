import {
  Epub,
  ElementName,
  ParsedXml,
  XmlElement,
  XmlNode,
} from "@smoores/epub"
import { BLOCKS } from "./semantics"
import { getXHtmlSentences } from "./getXhtmlSentences"

type Mark = {
  elementName: ElementName
  attributes: Record<string, string> | undefined
}

export function appendTextNode(
  chapterId: string,
  xml: ParsedXml,
  text: string,
  marks: Mark[],
  taggedSentences: Set<number>,
  sentenceId?: number,
) {
  if (text.length === 0) return

  const textNode = { "#text": text }

  appendLeafNode(chapterId, xml, textNode, marks, taggedSentences, sentenceId)
}

export function appendLeafNode(
  chapterId: string,
  xml: ParsedXml,
  node: XmlNode,
  marks: Mark[],
  taggedSentences: Set<number>,
  sentenceId?: number,
) {
  const tagId = `${chapterId}-sentence${sentenceId}`

  const markedNode = [...marks].reverse().reduce<XmlElement>(
    (acc, mark) =>
      ({
        [mark.elementName]: [acc],
        ":@": mark.attributes,
      }) as XmlElement,
    node,
  )

  const lastNode = xml[xml.length - 1]
  if (
    lastNode &&
    !Epub.isXmlTextNode(lastNode) &&
    lastNode[":@"]?.["@_id"] &&
    lastNode[":@"]["@_id"] === tagId
  ) {
    const tagName = Epub.getXmlElementName(lastNode)
    lastNode[tagName]?.push(markedNode)
    return
  }

  if (sentenceId === undefined || taggedSentences.has(sentenceId)) {
    xml.push(markedNode)
    return
  }

  const taggedNode = {
    span: [markedNode],
    ":@": { "@_id": tagId },
  }

  taggedSentences.add(sentenceId)
  xml.push(taggedNode)
}

type TagState = {
  currentSentenceIndex: number
  currentSentenceProgress: number
  currentNodeProgress: number
}

function tagSentencesInXml(
  chapterId: string,
  currentSentenceIndex: number,
  currentSentenceProgress: number,
  sentences: string[],
  currentNode: XmlNode,
  currentNodeProgress: number,
  taggedSentences: Set<number>,
  marks: Mark[],
  taggedXml: ParsedXml,
): TagState {
  if (Epub.isXmlTextNode(currentNode)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const remainingSentence = sentences[currentSentenceIndex]!.slice(
      currentSentenceProgress,
    )
    const text = currentNode["#text"]
    const remainingNodeText = text.slice(currentNodeProgress)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const index = remainingNodeText.indexOf(remainingSentence[0]!)
    if (index === -1) {
      appendTextNode(
        chapterId,
        taggedXml,
        remainingNodeText,
        marks,
        taggedSentences,
      )
      return {
        currentSentenceIndex,
        currentSentenceProgress,
        currentNodeProgress: -1,
      }
    }
    if (remainingNodeText.slice(index).length < remainingSentence.length) {
      appendTextNode(
        chapterId,
        taggedXml,
        remainingNodeText.slice(0, index),
        marks,
        taggedSentences,
      )
      appendTextNode(
        chapterId,
        taggedXml,
        remainingNodeText.slice(index),
        marks,
        taggedSentences,
        currentSentenceIndex,
      )
      return {
        currentSentenceIndex,
        currentSentenceProgress:
          currentSentenceProgress + remainingNodeText.length - index,
        currentNodeProgress: -1,
      }
    } else {
      appendTextNode(
        chapterId,
        taggedXml,
        remainingNodeText.slice(0, index),
        marks,
        taggedSentences,
      )
      appendTextNode(
        chapterId,
        taggedXml,
        remainingSentence,
        marks,
        taggedSentences,
        currentSentenceIndex,
      )

      // If we've just appended the very last sentence, make sure that we also
      // add back the remainder of this text node (which should be whitespace).
      if (currentSentenceIndex + 1 === sentences.length) {
        appendTextNode(
          chapterId,
          taggedXml,
          remainingNodeText.slice(index + remainingSentence.length),
          marks,
          taggedSentences,
        )
      }

      return {
        currentSentenceIndex: currentSentenceIndex + 1,
        currentSentenceProgress: 0,
        currentNodeProgress:
          currentNodeProgress + remainingSentence.length + index,
      }
    }
  }

  const tagName = Epub.getXmlElementName(currentNode)

  let state: TagState = {
    currentSentenceIndex,
    currentSentenceProgress,
    currentNodeProgress,
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const children = currentNode[tagName]!
  for (const child of children) {
    if (state.currentSentenceIndex > sentences.length - 1) {
      taggedXml.push(child)
      continue
    }
    state.currentNodeProgress = 0

    let nextTaggedXml = taggedXml
    const nextMarks = [...marks]
    if (!Epub.isXmlTextNode(child)) {
      const childTagName = Epub.getXmlElementName(child)

      const isTextContent = BLOCKS.includes(childTagName.toLowerCase())

      if (child[childTagName]?.length === 0) {
        appendLeafNode(
          chapterId,
          taggedXml,
          child,
          nextMarks,
          taggedSentences,
          isTextContent || state.currentSentenceProgress === 0
            ? undefined
            : state.currentSentenceIndex,
        )
        continue
      }

      if (isTextContent) {
        const block = {
          [childTagName]: [],
          ":@": child[":@"],
        } as XmlElement
        nextTaggedXml.push(block)
        nextTaggedXml = Epub.getXmlChildren(block)
      } else {
        nextMarks.push({
          elementName: childTagName,
          attributes: child[":@"],
        })
      }
    }
    while (
      state.currentSentenceIndex < sentences.length &&
      state.currentNodeProgress !== -1
    ) {
      state = tagSentencesInXml(
        chapterId,
        state.currentSentenceIndex,
        state.currentSentenceProgress,
        sentences,
        child,
        state.currentNodeProgress,
        taggedSentences,
        nextMarks,
        nextTaggedXml,
      )
    }
  }

  state.currentNodeProgress = -1
  return state
}

function copyOuterXml(xml: ParsedXml) {
  const outerXml: ParsedXml = xml
  const html = Epub.findXmlChildByName("html", xml)
  if (!html) throw new Error("Invalid XHTML: Found no html element")

  const bodyIndex = html["html"].findIndex((element) => "body" in element)
  const body = html["html"][bodyIndex]
  if (!body) throw new Error("Invalid XHTML: Found no body element")

  html["html"].splice(bodyIndex, 1, {
    ...body,
    body: [],
  })

  return outerXml
}

export function tagSentences(
  chapterId: string,
  xml: ParsedXml,
  locale: Intl.Locale,
) {
  const html = Epub.findXmlChildByName("html", xml)
  if (!html) throw new Error("Invalid XHTML document: no html element")

  const body = Epub.findXmlChildByName("body", html["html"])
  if (!body) throw new Error("Invalid XHTML document: No body element")

  const sentences = getXHtmlSentences(body["body"], locale)
  const outerXml = copyOuterXml(xml)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const taggedHtml = Epub.findXmlChildByName("html", xml)!

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const taggedBody = Epub.findXmlChildByName("body", taggedHtml["html"])!
  taggedBody["body"] = []

  tagSentencesInXml(
    chapterId,
    0,
    0,
    sentences,
    body,
    0,
    new Set(),
    [],
    taggedBody["body"],
  )

  return outerXml
}
