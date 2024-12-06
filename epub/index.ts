import {
  Entry,
  Uint8ArrayReader,
  Uint8ArrayWriter,
  ZipReader,
  ZipWriter,
} from "@zip.js/zip.js"
import { XMLBuilder, XMLParser } from "fast-xml-parser"
import memoize, { memoizeClear } from "memoize"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path/posix"
import { streamFile } from "@smoores/fs"

export type ElementName =
  `${"a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"}${string}`

export type XmlElement<Name extends ElementName = ElementName> = {
  ":@"?: Record<string, string>
} & {
  [key in Name]: ParsedXml
}

export type XmlTextNode = { "#text": string }

export type XmlNode = XmlElement | XmlTextNode

export type ParsedXml = Array<XmlNode>

export function isTextNode(node: XmlNode): node is XmlTextNode {
  return "#text" in node
}

export function findByName<Name extends ElementName>(
  name: Name,
  xml: ParsedXml,
  filter?: (node: XmlNode) => boolean,
): XmlElement<Name> | undefined {
  const element = xml.find((e) => name in e && (filter ? filter(e) : true))
  return element as XmlElement<Name> | undefined
}

export function getChildren<Name extends ElementName>(
  element: XmlElement<Name>,
): ParsedXml {
  const elementName = getElementName(element)
  // It's not clear to me why this needs to be cast
  return element[elementName] as ParsedXml
}

export function getElementName<Name extends ElementName>(
  element: XmlElement<Name>,
): Name {
  const keys = Object.keys(element)
  const elementName = keys.find((key) => key !== ":@" && key !== "#text")
  if (!elementName)
    throw new Error(
      `Invalid XML Element: missing tag name\n${JSON.stringify(element, null, 2)}`,
    )
  return elementName as Name
}

export function textContent(xml: ParsedXml): string {
  let text = ""
  for (const child of xml) {
    if (isTextNode(child)) {
      text += child["#text"]
      continue
    }

    const children = getChildren(child)
    text += textContent(children)
  }
  return text
}

export function getBody(xml: ParsedXml): ParsedXml {
  const html = findByName("html", xml)
  if (!html) throw new Error("Invalid XHTML document: no html element")

  const body = findByName("body", html["html"])
  if (!body) throw new Error("Invalid XHTML document: No body element")

  return body["body"]
}

export function addLink(
  xml: ParsedXml,
  link: { rel: string; href: string; type: string },
) {
  const html = findByName("html", xml)
  if (!html) throw new Error("Invalid XHTML document: no html element")

  const head = findByName("head", html.html)
  if (!head) throw new Error("Invalid XHTML document: no head element")

  head["head"].push({
    link: [],
    ":@": {
      "@_rel": link.rel,
      "@_href": link.href,
      "@_type": link.type,
    },
  })
}

export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor(duration / 60 - hours * 60)
  const secondsAndMillis = duration - minutes * 60 - hours * 3600
  const [seconds, millis] = secondsAndMillis.toFixed(2).split(".")
  // It's not actually possible for .split() to return fewer than one
  // item, so it's safe to assert that seconds is a defined string
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds!.padStart(2, "0")}.${millis ?? "0"}`
}

export type ManifestItem = {
  id: string
  href: string
  mediaType: string
  fallback?: string | undefined
  mediaOverlay?: string | undefined
  properties?: string[] | undefined
}

export class EpubEntry {
  filename: string

  private entry: Entry | null = null

  private data: Uint8Array | null = null

  async getData() {
    if (this.data) return this.data

    const writer = new Uint8ArrayWriter()
    // If this.data is undefined, then this.entry must be defined.
    // It's not clear why .getData is typed as conditional, since it
    // seems to always be defined.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data = await this.entry!.getData!<Uint8Array>(writer)
    this.data = data
    return this.data
  }

  setData(data: Uint8Array) {
    this.data = data
  }

  constructor(entry: Entry | { filename: string; data: Uint8Array }) {
    this.filename = entry.filename
    if ("data" in entry) {
      this.data = entry.data
    } else {
      this.entry = entry
    }
  }
}

export type MetadataEntry = {
  id: string | undefined
  type: ElementName
  properties: Record<string, string>
  value: string | undefined
}

export type EpubMetadata = MetadataEntry[]

/**
 * A single EPUB instance.
 *
 * The entire EPUB contents will be read into memory.
 *
 * ```ts
 * import { Epub, getBody, findByName, textContent } from '@smoores/epub';
 *
 * const epub = await Epub.from('./path/to/book.epub');
 * const title = await epub.getTitle();
 * const spineItems = await epub.getSpineItems();
 * const chptOne = spineItems[0];
 * const chptOneXml = await epub.readXhtmlItemContents(chptOne.id);
 *
 * const body = getBody(chptOneXml);
 * const h1 = findByName('h1', body);
 * const headingText = textContent(h1);
 *
 * await epub.setTitle(headingText);
 * await epub.writeToFile('./path/to/updated.epub');
 * await epub.close();
 */
export class Epub {
  static xmlParser = new XMLParser({
    allowBooleanAttributes: true,
    preserveOrder: true,
    ignoreAttributes: false,
  })

  static xhtmlParser = new XMLParser({
    allowBooleanAttributes: true,
    alwaysCreateTextNode: true,
    preserveOrder: true,
    ignoreAttributes: false,
    htmlEntities: true,
    trimValues: false,
    stopNodes: ["*.pre", "*.script"],
    parseTagValue: false,
    updateTag(_tagName, _jPath, attrs) {
      // There's never an attribute called "/";
      // this erroneously happens sometimes when parsing
      // self-closing stop nodes with ignoreAttributes: false
      // and allowBooleanAttributes: true.
      //
      // Also attrs is undefined if there are no attrs;
      // the types are wrong.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (attrs && "@_/" in attrs) {
        delete attrs["@_/"]
      }
      return true
    },
  })

  static xmlBuilder = new XMLBuilder({
    preserveOrder: true,
    format: true,
    ignoreAttributes: false,
    suppressEmptyNode: true,
  })

  static xhtmlBuilder = new XMLBuilder({
    preserveOrder: true,
    ignoreAttributes: false,
    stopNodes: ["*.pre", "*.script"],
    suppressEmptyNode: true,
  })

  private zipWriter: ZipWriter<Uint8Array>

  private dataWriter: Uint8ArrayWriter

  private rootfile: string | null = null

  private manifest: Record<string, ManifestItem> | null = null

  private spine: string[] | null = null

  private constructor(
    private entries: EpubEntry[],
    private onClose?: () => Promise<void> | void,
  ) {
    this.dataWriter = new Uint8ArrayWriter()
    this.zipWriter = new ZipWriter(this.dataWriter)

    this.readXhtmlItemContents = memoize(
      this.readXhtmlItemContents.bind(this),
      // This isn't unnecessary, the generic here just isn't handling the
      // overloaded method type correctly
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      { cacheKey: ([id, as]) => `${id}:${as ?? "xhtml"}` },
    )
  }

  /**
   * Close the Epub. Must be called before the Epub goes out
   * of scope/is garbage collected.
   */
  async close() {
    await this.onClose?.()
    // TODO: Is it actually necessary to close the writer?
    // It will always be empty at this point, and close will
    // actually do more unnecessary work to produce an empty
    // ZIP archive.
    await this.zipWriter.close()
  }

  /**
   * Construct an Epub instance, optionally beginning
   * with the provided metadata.
   *
   * @param metadata An array of metadata entries, representing the
   *  initial metadata for the Epub
   */
  static async create(metadata: EpubMetadata = []): Promise<Epub> {
    const entries = []
    const encoder = new TextEncoder()
    const container = encoder.encode(`<?xml version="1.0"?>
<container>
  <rootfiles>
    <rootfile media-type="application/oebps-package+xml" full-path="OEBPS/content.opf"/>
  </rootfiles>
</container>
`)
    entries.push(
      new EpubEntry({ filename: "META-INF/container.xml", data: container }),
    )

    const packageDocument = encoder.encode(`<?xml version="1.0"?>
<package>
  <metadata>
  </metadata>
  <manifest>
  </manifest>
  <spine>
  </spine>
</package>    
`)
    entries.push(
      new EpubEntry({ filename: "OEBPS/content.opf", data: packageDocument }),
    )

    const epub = new Epub(entries)
    await Promise.all(
      metadata.map((entry) =>
        epub.addMetadata(
          entry.type,
          { ...entry.properties, ...(entry.id && { id: entry.id }) },
          entry.value,
        ),
      ),
    )
    return epub
  }

  /**
   * Construct an Epub instance by reading an EPUB
   * file from `path`.
   *
   * @param path Must be a valid filepath to an EPUB archive
   */
  static async from(path: string): Promise<Epub> {
    const fileData = await streamFile(path)
    const dataReader = new Uint8ArrayReader(fileData)
    const zipReader = new ZipReader(dataReader)
    const zipEntries = await zipReader.getEntries()
    const epubEntries = zipEntries.map((entry) => new EpubEntry(entry))
    const epub = new Epub(epubEntries, () => zipReader.close())
    return epub
  }

  private getEntry(path: string) {
    const entries = this.entries
    return entries.find((entry) => entry.filename === path)
  }

  private async getFileData(path: string): Promise<Uint8Array>
  private async getFileData(path: string, encoding: "utf-8"): Promise<string>
  private async getFileData(
    path: string,
    encoding?: "utf-8" | undefined,
  ): Promise<string | Uint8Array> {
    const containerEntry = this.getEntry(path)

    if (!containerEntry)
      throw new Error(
        `Could not get file data for entry ${path}: entry not found`,
      )

    const containerContents = await containerEntry.getData()

    return encoding === "utf-8"
      ? new TextDecoder("utf-8").decode(containerContents)
      : containerContents
  }

  private async getRootfile() {
    if (this.rootfile !== null) return this.rootfile

    const containerString = await this.getFileData(
      "META-INF/container.xml",
      "utf-8",
    )

    if (!containerString)
      throw new Error("Failed to parse EPUB: Missing META-INF/container.xml")

    const containerDocument = Epub.xmlParser.parse(containerString) as ParsedXml
    const container = findByName("container", containerDocument)

    if (!container)
      throw new Error(
        "Failed to parse EPUB container.xml: Found no container element",
      )

    const rootfiles = findByName("rootfiles", getChildren(container))

    if (!rootfiles)
      throw new Error(
        "Failed to parse EPUB container.xml: Found no rootfiles element",
      )

    const rootfile = findByName(
      "rootfile",
      getChildren(rootfiles),
      (node) =>
        !isTextNode(node) &&
        node[":@"]?.["@_media-type"] === "application/oebps-package+xml",
    )

    if (!rootfile?.[":@"]?.["@_full-path"])
      throw new Error(
        "Failed to parse EPUB container.xml: Found no rootfile element",
      )

    this.rootfile = rootfile[":@"]["@_full-path"]

    return this.rootfile
  }

  private async getPackageDocument() {
    const rootfile = await this.getRootfile()
    const packageDocumentString = await this.getFileData(rootfile, "utf-8")

    if (!packageDocumentString)
      throw new Error(
        `Failed to parse EPUB: could not find package document at ${rootfile}`,
      )

    const packageDocument = Epub.xmlParser.parse(
      packageDocumentString,
    ) as ParsedXml

    return packageDocument
  }

  /**
   * Retrieve the manifest for the Epub.
   *
   * This is represented as a map from each manifest items'
   * id to the rest of its properties.
   */
  async getManifest() {
    if (this.manifest !== null) return this.manifest

    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)

    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: Found no package element in package document",
      )

    const manifest = findByName("manifest", getChildren(packageElement))

    if (!manifest)
      throw new Error(
        "Failed to parse EPUB: Found no manifest element in package document",
      )

    this.manifest = getChildren(manifest).reduce<Record<string, ManifestItem>>(
      (acc, item) => {
        if (isTextNode(item)) return acc

        if (
          !item[":@"]?.["@_id"] ||
          !item[":@"]["@_href"] ||
          !item[":@"]["@_media-type"]
        ) {
          return acc
        }

        return {
          ...acc,
          [item[":@"]["@_id"]]: {
            id: item[":@"]["@_id"],
            href: item[":@"]["@_href"],
            mediaType: item[":@"]["@_media-type"],
            mediaOverlay: item[":@"]["@_media-overlay"],
            fallback: item[":@"]["@_fallback"],
            properties: item[":@"]["@_properties"]?.split(" "),
          },
        }
      },
      {},
    )

    return this.manifest
  }

  /**
   * Retrieve the metadata entries for the Epub.
   *
   * This is represented as an array of metadata entries,
   * in the order that they're presented in the Epub package document.
   *
   * For more useful semantic representations of metadata, use
   * specific methods such as `getTitle()` and `getAuthors()`.
   */
  async getMetadata() {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)

    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: Found no package element in package document",
      )

    const metadataElement = findByName("metadata", packageElement.package)

    if (!metadataElement)
      throw new Error(
        "Failed to parse EPUB: Found no metadata element in package document",
      )

    const metadata: EpubMetadata = metadataElement.metadata
      .filter((node): node is XmlElement => !isTextNode(node))
      .map((item) => {
        const id = item[":@"]?.["@_id"]
        const elementName = getElementName(item)
        const textNode = getChildren(item)[0]
        if (!textNode || !isTextNode(textNode)) return null

        // https://www.w3.org/TR/epub-33/#sec-metadata-values
        // Whitespace within these element values is not significant.
        // Sequences of one or more whitespace characters are collapsed
        // to a single space [infra] during processing .
        const value = textNode["#text"].replaceAll(/\s+/g, " ")
        const attributes = item[":@"] ?? {}
        const properties = Object.fromEntries(
          Object.entries(attributes).map(([attrName, value]) => [
            attrName.slice(2),
            value,
          ]),
        )
        return {
          id,
          type: elementName,
          properties,
          value,
        }
      })
      .filter((element) => !!element)

    return metadata
  }

  /**
   * Even "EPUB 3" publications sometimes still only use the
   * EPUB 2 specification for identifying the cover image.
   * This is a private method that is used as a fallback if
   * we fail to find the cover image according to the EPUB 3
   * spec.
   */
  private async getEpub2CoverImage() {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)

    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: Found no package element in package document",
      )

    const metadataElement = findByName("metadata", getChildren(packageElement))

    if (!metadataElement)
      throw new Error(
        "Failed to parse EPUB: Found no metadata element in package document",
      )

    const coverImageElement = getChildren(metadataElement).find(
      (node): node is XmlElement =>
        !isTextNode(node) && node[":@"]?.["@_name"] === "cover",
    )

    const manifestItemId = coverImageElement?.[":@"]?.["@_content"]
    if (!manifestItemId) return null

    const manifest = await this.getManifest()
    return (
      Object.values(manifest).find((item) => item.id === manifestItemId) ?? null
    )
  }

  /**
   * Retrieve the cover image manifest item.
   *
   * This does not return the actual image data. To
   * retrieve the image data, pass this item's id to
   * epub.readItemContents, or use epub.getCoverImage()
   * instead.
   */
  async getCoverImageItem() {
    const manifest = await this.getManifest()
    const coverImage = Object.values(manifest).find((item) =>
      item.properties?.includes("cover-image"),
    )
    if (coverImage) return coverImage

    return this.getEpub2CoverImage()
  }

  /**
   * Retrieve the cover image data as a byte array.
   *
   * This does not include, for example, the cover image's
   * filename or mime type. To retrieve the image manifest
   * item, use epub.getCoverImageItem().
   */
  async getCoverImage() {
    const coverImageItem = await this.getCoverImageItem()
    if (!coverImageItem) return coverImageItem

    return this.readItemContents(coverImageItem.id)
  }

  /**
   * Retrieve the Epub's language as specified in its
   * package document metadata.
   *
   * If no language metadata is specified, returns null.
   * Returns the language as an Intl.Locale instance.
   */
  async getLanguage() {
    const metadata = await this.getMetadata()
    const languageEntries = metadata.filter(
      (entry) => entry.type === "dc:language",
    )
    const primaryLanguage = languageEntries[0]
    if (!primaryLanguage) return null

    const locale = primaryLanguage.value
    // Handle a weird edge case where Calibre's metadata
    // GUI incorrectly sets the language code to 'und'
    // https://www.mobileread.com/forums/showthread.php?t=87928
    if (!locale || locale === "und") return null

    return new Intl.Locale(locale)
  }

  /**
   * Update the Epub's language metadata entry.
   */
  // TODO: Should this take a Locale instead of a string?
  async setLanguage(languageCode: string) {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)
    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: found no package element in package document",
      )

    const metadata = findByName("metadata", packageElement.package)
    if (!metadata)
      throw new Error(
        "Failed to parse EPUB: found no metadata element in package document",
      )

    const languageElement = findByName("dc:language", metadata.metadata)

    if (!languageElement) {
      metadata.metadata.push({
        "dc:language": [{ "#text": languageCode } as XmlNode],
      })
    } else {
      languageElement["dc:language"] = [{ "#text": languageCode } as XmlNode]
    }

    const updatedPackageDocument = (await Epub.xmlBuilder.build(
      packageDocument,
    )) as string

    const rootfile = await this.getRootfile()

    this.writeEntryContents(rootfile, updatedPackageDocument, "utf-8")
  }

  /**
   * Retrieve the title of the Epub.
   *
   * @param short Optional - whether to return only the first title segment
   *  if multiple are found. Otherwise, will follow the spec to combine title
   *  segments
   */
  async getTitle(short = false) {
    const metadata = await this.getMetadata()
    const titleEntries = metadata.filter((entry) => entry.type === "dc:title")
    if (titleEntries.length === 1 || short) return titleEntries[0]?.value

    const titleRefinements = metadata.filter(
      (entry) =>
        entry.type === "meta" &&
        entry.properties["refines"] &&
        (entry.properties["property"] === "title-type" ||
          entry.properties["property"] === "display-seq"),
    )

    const expandedTitle = titleEntries.find((titleEntry) => {
      if (!titleEntry.id) return false

      const refinement = titleRefinements.find(
        (refinement) =>
          refinement.properties["property"] === "title-type" &&
          refinement.properties["refines"]?.slice(1) === titleEntry.id,
      )

      return refinement?.value === "expanded"
    })

    if (expandedTitle) return expandedTitle.value

    const sortedTitleParts = titleEntries
      .filter(
        (titleEntry) =>
          titleEntry.id &&
          titleRefinements.some(
            (entry) =>
              entry.value &&
              entry.properties["refines"]?.slice(1) === titleEntry.id &&
              entry.properties["property"] === "display-seq" &&
              !Number.isNaN(parseInt(entry.value, 10)),
          ),
      )
      .sort((a, b) => {
        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        const refinementA = titleRefinements.find(
          (entry) =>
            entry.properties["property"] === "display-seq" &&
            entry.properties["refines"]!.slice(1) === a.id,
        )!
        const refinementB = titleRefinements.find(
          (entry) =>
            entry.properties["property"] === "display-seq" &&
            entry.properties["refines"]!.slice(1) === b.id,
        )!
        const sortA = parseInt(refinementA.value!, 10)
        const sortB = parseInt(refinementB.value!, 10)
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
        return sortA - sortB
      })

    return (sortedTitleParts.length === 0 ? titleEntries : sortedTitleParts)
      .map((entry) => entry.value)
      .join(", ")
  }

  /**
   * Set the title of the Epub.
   *
   * If a title already exists, only the first title metadata
   * entry will be modified to match the new value.
   *
   * If no title currently exists, a single title metadata entry
   * will be created.
   */
  // TODO: This should allow users to optionally specify an array,
  // rather than a single string, to support expanded titles.
  async setTitle(title: string) {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)
    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: found no package element in package document",
      )

    const metadata = findByName("metadata", packageElement.package)
    if (!metadata)
      throw new Error(
        "Failed to parse EPUB: found no metadata element in package document",
      )

    const titleElement = findByName("dc:title", metadata.metadata)

    if (!titleElement) {
      metadata.metadata.push({
        "dc:title": [{ "#text": title } as XmlNode],
      })
    } else {
      titleElement["dc:title"] = [{ "#text": title } as XmlNode]
    }

    const updatedPackageDocument = (await Epub.xmlBuilder.build(
      packageDocument,
    )) as string

    const rootfile = await this.getRootfile()

    this.writeEntryContents(rootfile, updatedPackageDocument, "utf-8")
  }

  /**
   * Retrieve the list of authors.
   *
   * Each author object will contain a name, an optional role,
   * and a "fileAs" (which defaults to the author's name, if none
   * is specified).
   */
  async getAuthors(): Promise<
    {
      name: string
      role: string | null
      fileAs: string
    }[]
  > {
    const metadata = await this.getMetadata()
    const creatorEntries = metadata.filter(
      (entry) => entry.type === "dc:creator" && entry.value,
    )
    const creatorRefinements = metadata.filter(
      (entry) =>
        entry.type === "meta" &&
        entry.properties["refines"] &&
        (entry.properties["property"] === "role" ||
          entry.properties["property"] === "file-as"),
    )

    return creatorEntries
      .filter((creatorEntry) => !!creatorEntry.value)
      .map((creatorEntry) => {
        // We've already filtered out all of the entries that don't have values
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const name = creatorEntry.value!
        if (!creatorEntry.id) return { name, fileAs: name, role: null }

        const roleEntry = creatorRefinements.find(
          (entry) =>
            entry.properties["property"] === "role" &&
            entry.properties["refines"]?.slice(1) === creatorEntry.id,
        )
        const fileAsEntry = creatorRefinements.find(
          (entry) =>
            entry.properties["property"] === "file-as" &&
            entry.properties["refines"]?.slice(1) === creatorEntry.id,
        )

        return {
          name: name,
          role: roleEntry?.value ?? null,
          fileAs: fileAsEntry?.value ?? name,
        }
      })
  }

  private async getSpine() {
    if (this.spine !== null) return this.spine

    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)

    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: Found no package element in package document",
      )

    const spine = findByName("spine", packageElement["package"])

    if (!spine)
      throw new Error(
        "Failed to parse EPUB: Found no spine element in package document",
      )

    this.spine = spine["spine"]
      .filter((node): node is XmlElement => !isTextNode(node))
      .map((itemref) => itemref[":@"]?.["@_idref"])
      .filter((idref): idref is string => !!idref)

    return this.spine
  }

  /**
   * Retrieve the manifest items that make up the Epub's spine.
   *
   * The spine specifies the order that the contents of the Epub
   * should be displayed to users by default.
   */
  async getSpineItems() {
    const spine = await this.getSpine()
    const manifest = await this.getManifest()

    return spine.map((itemref) => manifest[itemref]).filter((entry) => !!entry)
  }

  /**
   * Returns a Zip Entry path for an HREF
   */
  private resolveHref(from: string, href: string) {
    const startPath = dirname(from)
    const absoluteStartPath = startPath.startsWith("/")
      ? startPath
      : `/${startPath}`

    return resolve(absoluteStartPath, href).slice(1)
  }

  /**
   * Retrieve the contents of a manifest item, given its id.
   *
   * @param id The id of the manifest item to retrieve
   * @param [encoding] Optional - must be the string "utf-8". If
   *  provided, the function will encode the data into a unicode string.
   *  Otherwise, the data will be returned as a byte array.
   */
  async readItemContents(id: string): Promise<Uint8Array>
  async readItemContents(id: string, encoding: "utf-8"): Promise<string>
  async readItemContents(
    id: string,
    encoding?: "utf-8",
  ): Promise<string | Uint8Array> {
    const rootfile = await this.getRootfile()
    const manifest = await this.getManifest()
    const manifestItem = manifest[id]

    if (!manifestItem)
      throw new Error(`Could not find item with id "${id}" in manifest`)

    const path = this.resolveHref(rootfile, manifestItem.href)
    const itemEntry = encoding
      ? await this.getFileData(path, encoding)
      : await this.getFileData(path)
    return itemEntry
  }

  /**
   * Retrieves the contents of an XHTML item, given its manifest id.
   *
   * @param id The id of the manifest item to retrieve
   * @param [as] Optional - whether to return the parsed XML document tree,
   *  or the concatenated text of the document. Defaults to the parsed XML tree.
   */
  async readXhtmlItemContents(id: string, as?: "xhtml"): Promise<ParsedXml>
  async readXhtmlItemContents(id: string, as: "text"): Promise<string>
  async readXhtmlItemContents(
    id: string,
    as: "xhtml" | "text" = "xhtml",
  ): Promise<ParsedXml | string> {
    const contents = await this.readItemContents(id, "utf-8")
    const xml = Epub.xhtmlParser.parse(contents) as ParsedXml
    if (as === "xhtml") return xml

    const body = getBody(xml)
    return textContent(body)
  }

  private writeEntryContents(path: string, contents: Uint8Array): void
  private writeEntryContents(
    path: string,
    contents: string,
    encoding: "utf-8",
  ): void
  private writeEntryContents(
    path: string,
    contents: Uint8Array | string,
    encoding?: "utf-8",
  ): void {
    const data =
      encoding === "utf-8"
        ? new TextEncoder().encode(contents as string)
        : (contents as Uint8Array)

    const entry = this.getEntry(path)

    if (!entry) throw new Error(`Could not find file at ${path} in EPUB`)

    entry.setData(data)
  }

  /**
   * Write new contents for an existing manifest item,
   * specified by its id.
   *
   * The id must reference an existing manifest item. If
   * creating a new item, use `epub.addManifestItem()` instead.
   *
   * @param id The id of the manifest item to write new contents for
   * @param contents The new contents. May be either a utf-8 encoded string
   *  or a byte array, as determined by the encoding
   * @param [encoding] Optional - must be the string "utf-8". If provided,
   *  the contents will be interpreted as a unicode string. Otherwise, the
   *  contents must be a byte array.
   */
  async writeItemContents(id: string, contents: Uint8Array): Promise<void>
  async writeItemContents(
    id: string,
    contents: string,
    encoding: "utf-8",
  ): Promise<void>
  async writeItemContents(
    id: string,
    contents: Uint8Array | string,
    encoding?: "utf-8",
  ): Promise<void> {
    const rootfile = await this.getRootfile()
    const manifest = await this.getManifest()
    const manifestItem = manifest[id]
    if (!manifestItem)
      throw new Error(`Could not find item with id "${id}" in manifest`)

    // readXhtmlItemContents is already explicitly bound in the constructor
    // eslint-disable-next-line @typescript-eslint/unbound-method
    memoizeClear(this.readXhtmlItemContents)
    const href = this.resolveHref(rootfile, manifestItem.href)
    if (encoding === "utf-8") {
      this.writeEntryContents(href, contents as string, encoding)
    } else {
      this.writeEntryContents(href, contents as Uint8Array)
    }
  }

  /**
   * Write new contents for an existing XHTML item,
   * specified by its id.
   *
   * The id must reference an existing manifest item. If
   * creating a new item, use `epub.addManifestItem()` instead.
   *
   * @param id The id of the manifest item to write new contents for
   * @param contents The new contents. Must be a parsed XML tree.
   */
  async writeXhtmlItemContents(id: string, contents: ParsedXml): Promise<void> {
    await this.writeItemContents(
      id,
      Epub.xhtmlBuilder.build(contents) as string,
      "utf-8",
    )
  }

  /**
   * Create a new manifest item and write its contents to a
   * new entry.
   *
   * @param id The id of the manifest item to write new contents for
   * @param contents The new contents. May be either a parsed XML tree
   *  or a unicode string, as determined by the `as` argument.
   * @param encoding Optional - whether to interpret contents as a parsed
   *  XML tree, a unicode string, or a byte array. Defaults to a byte array.
   */
  async addManifestItem(
    item: ManifestItem,
    contents: ParsedXml,
    encoding: "xml",
  ): Promise<void>
  async addManifestItem(
    item: ManifestItem,
    contents: string,
    encoding: "utf-8",
  ): Promise<void>
  async addManifestItem(item: ManifestItem, contents: Uint8Array): Promise<void>
  async addManifestItem(
    item: ManifestItem,
    contents: string | Uint8Array | ParsedXml,
    encoding?: "utf-8" | "xml",
  ): Promise<void> {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)

    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: Found no package element in package document",
      )

    const manifest = findByName("manifest", packageElement["package"])

    if (!manifest)
      throw new Error(
        "Failed to parse EPUB: Found no manifest element in package document",
      )

    // TODO: Should we ensure that there isn't already a manifest
    // item with this id first?
    manifest["manifest"].push({
      item: [],
      ":@": {
        "@_id": item.id,
        "@_href": item.href,
        "@_media-type": item.mediaType,
        ...(item.fallback && { "@_fallback": item.fallback }),
        ...(item.mediaOverlay && { "@_media-overlay": item.mediaOverlay }),
        ...(item.properties && { "@_properties": item.properties.join(" ") }),
      },
    })

    const updatedPackageDocument = (await Epub.xmlBuilder.build(
      packageDocument,
    )) as string

    const rootfile = await this.getRootfile()

    this.writeEntryContents(rootfile, updatedPackageDocument, "utf-8")

    // Reset the cached manifest, so that it will be read from
    // the updated XML next time
    this.manifest = null

    const filename = this.resolveHref(rootfile, item.href)

    const data =
      encoding === "utf-8" || encoding === "xml"
        ? new TextEncoder().encode(
            encoding === "utf-8"
              ? (contents as string)
              : ((await Epub.xmlBuilder.build(
                  contents as ParsedXml,
                )) as string),
          )
        : (contents as Uint8Array)

    this.entries.push(new EpubEntry({ filename, data }))
  }

  /**
   * Update the manifest entry for an existing item.
   *
   * To update the contents of an entry, use `epub.writeItemContents()`
   * or `epub.writeXhtmlItemContents()`
   */
  async updateManifestItem(id: string, newItem: Omit<ManifestItem, "id">) {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)

    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: Found no package element in package document",
      )

    const manifest = findByName("manifest", getChildren(packageElement))

    if (!manifest)
      throw new Error(
        "Failed to parse EPUB: Found no manifest element in package document",
      )

    const itemIndex = manifest["manifest"].findIndex(
      (item) => !isTextNode(item) && item[":@"]?.["@_id"] === id,
    )

    manifest["manifest"].splice(itemIndex, 1, {
      item: [],
      ":@": {
        "@_id": id,
        "@_href": newItem.href,
        "@_media-type": newItem.mediaType,
        ...(newItem.fallback && { "@_fallback": newItem.fallback }),
        ...(newItem.mediaOverlay && {
          "@_media-overlay": newItem.mediaOverlay,
        }),
        ...(newItem.properties && {
          "@_properties": newItem.properties.join(" "),
        }),
      },
    })

    const updatedPackageDocument = (await Epub.xmlBuilder.build(
      packageDocument,
    )) as string

    const rootfile = await this.getRootfile()

    this.writeEntryContents(rootfile, updatedPackageDocument, "utf-8")

    // Reset the cached manifest, so that it will be read from
    // the updated XML next time
    this.manifest = null
  }

  /**
   * Add a new metadata entry to the Epub.
   *
   * This method, like `epub.getMetadata()`, operates on
   * metadata entries. For more useful semantic representations
   * of metadata, use specific methods such as `setTitle()` and
   * `setLanguage()`.
   *
   * @param name The name of the element, usually "meta"
   * @param attributes
   * @param value Optional
   */
  async addMetadata<Name extends ElementName>(
    name: Name,
    attributes: Record<string, string>,
    value?: string,
  ) {
    const packageDocument = await this.getPackageDocument()

    const packageElement = findByName("package", packageDocument)
    if (!packageElement)
      throw new Error(
        "Failed to parse EPUB: found no package element in package document",
      )

    const metadata = findByName("metadata", packageElement.package)
    if (!metadata)
      throw new Error(
        "Failed to parse EPUB: found no metadata element in package document",
      )

    metadata.metadata.push({
      ":@": Object.fromEntries(
        Object.entries(attributes).map(([property, value]) => [
          `@_${property}`,
          value,
        ]),
      ),
      [name]: value !== undefined ? [{ "#text": value }] : [],
    } as XmlElement)

    const updatedPackageDocument = (await Epub.xmlBuilder.build(
      packageDocument,
    )) as string

    const rootfile = await this.getRootfile()

    this.writeEntryContents(rootfile, updatedPackageDocument, "utf-8")
  }

  /**
   * Write the current contents of the Epub to a new
   * EPUB archive on disk.
   *
   * This _does not_ close the Epub. It can continue to
   * be modified after it has been written to disk. Use
   * `epub.close()` to close the Epub.
   *
   * @param path The file path to write the new archive to. The
   *  parent directory does not need te exist -- the path will be
   *  recursively created.
   */
  async writeToFile(path: string) {
    let mimetypeEntry = this.getEntry("mimetype")
    if (!mimetypeEntry) {
      this.writeEntryContents("mimetype", "application/epub+zip", "utf-8")
      // This is guaranteed to exist; we just created it
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mimetypeEntry = this.getEntry("mimetype")!
    }

    const mimetypeReader = new Uint8ArrayReader(await mimetypeEntry.getData())
    await this.zipWriter.add(mimetypeEntry.filename, mimetypeReader, {
      level: 0,
      extendedTimestamp: false,
    })

    await Promise.all(
      this.entries.map(async (entry) => {
        if (entry.filename === "mimetype") return
        const reader = new Uint8ArrayReader(await entry.getData())
        return this.zipWriter.add(entry.filename, reader)
      }),
    )

    const data = await this.zipWriter.close()
    if (!data.length)
      throw new Error(
        "Failed to write zip archive to file; writer returned no data",
      )

    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, data)

    // Reset the ZipWriter to allow further modification
    this.dataWriter = new Uint8ArrayWriter()
    this.zipWriter = new ZipWriter(this.dataWriter)
  }
}
