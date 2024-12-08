# @smoores/epub

A Node.js library for inspecting, modifying, and creating EPUB 3 publications.

<!-- toc -->

- [Installation](#installation)
- [About](#about)
  - [EPUB Basics](#epub-basics)
  - [What this library does](#what-this-library-does)
- [Usage](#usage)
  - [Reading from a file](#reading-from-a-file)
  - [Creating from scratch](#creating-from-scratch)
- [Development](#development)
- [Classes](#classes)
  - [Epub](#epub)
    - [Link](#link)
    - [Properties](#properties)
      - [xhtmlBuilder](#xhtmlbuilder)
      - [xhtmlParser](#xhtmlparser)
      - [xmlBuilder](#xmlbuilder)
      - [xmlParser](#xmlparser)
    - [Methods](#methods)
      - [addContributor()](#addcontributor)
      - [addCreator()](#addcreator)
      - [addManifestItem()](#addmanifestitem)
      - [addMetadata()](#addmetadata)
      - [addSpineItem()](#addspineitem)
      - [addSubject()](#addsubject)
      - [close()](#close)
      - [getContributors()](#getcontributors)
      - [getCoverImage()](#getcoverimage)
      - [getCoverImageItem()](#getcoverimageitem)
      - [getCreators()](#getcreators)
      - [getLanguage()](#getlanguage)
      - [getManifest()](#getmanifest)
      - [getMetadata()](#getmetadata)
      - [getPublicationDate()](#getpublicationdate)
      - [getSpineItems()](#getspineitems)
      - [getSubjects()](#getsubjects)
      - [getTitle()](#gettitle)
      - [getType()](#gettype)
      - [readItemContents()](#readitemcontents)
      - [readXhtmlItemContents()](#readxhtmlitemcontents)
      - [removeSpineItem()](#removespineitem)
      - [replaceMetadata()](#replacemetadata)
      - [setLanguage()](#setlanguage)
      - [setPublicationDate()](#setpublicationdate)
      - [setTitle()](#settitle)
      - [setType()](#settype)
      - [updateManifestItem()](#updatemanifestitem)
      - [writeItemContents()](#writeitemcontents)
      - [writeToFile()](#writetofile)
      - [writeXhtmlItemContents()](#writexhtmlitemcontents)
      - [addLinkToXhtmlHead()](#addlinktoxhtmlhead)
      - [create()](#create)
      - [findXmlChildByName()](#findxmlchildbyname)
      - [formatSmilDuration()](#formatsmilduration)
      - [from()](#from)
      - [getXhtmlBody()](#getxhtmlbody)
      - [getXhtmlTextContent()](#getxhtmltextcontent)
      - [getXmlChildren()](#getxmlchildren)
      - [getXmlElementName()](#getxmlelementname)
      - [isXmlTextNode()](#isxmltextnode)
- [Interfaces](#interfaces)
  - [AlternateScript](#alternatescript)
    - [Properties](#properties-1)
      - [locale](#locale-1)
      - [name](#name-1)
  - [DcCreator](#dccreator)
    - [Properties](#properties-2)
      - [alternateScripts?](#alternatescripts)
      - [fileAs?](#fileas)
      - [name](#name-2)
      - [role?](#role)
  - [DcSubject](#dcsubject)
    - [Properties](#properties-3)
      - [authority](#authority)
      - [term](#term)
      - [value](#value)
  - [DublinCore](#dublincore)
    - [Properties](#properties-4)
      - [contributors?](#contributors)
      - [creators?](#creators)
      - [date?](#date)
      - [identifier](#identifier)
      - [language](#language)
      - [subjects?](#subjects)
      - [title](#title-1)
      - [type?](#type-1)
- [Type Aliases](#type-aliases)
  - [ElementName](#elementname)
    - [Defined in](#defined-in-67)
  - [EpubMetadata](#epubmetadata)
    - [Defined in](#defined-in-68)
  - [ManifestItem](#manifestitem)
    - [Type declaration](#type-declaration)
      - [fallback?](#fallback)
      - [href](#href-1)
      - [id](#id-8)
      - [mediaOverlay?](#mediaoverlay)
      - [mediaType](#mediatype)
      - [properties?](#properties)
    - [Defined in](#defined-in-69)
  - [MetadataEntry](#metadataentry)
    - [Type declaration](#type-declaration-1)
      - [id?](#id)
      - [properties](#properties)
      - [type](#type-3)
      - [value](#value-1)
    - [Defined in](#defined-in-70)
  - [ParsedXml](#parsedxml)
    - [Defined in](#defined-in-71)
  - [XmlElement\](#xmlelement)
    - [Type declaration](#type-declaration-2)
      - [:@?](#)
    - [Type Parameters](#type-parameters-3)
    - [Defined in](#defined-in-72)
  - [XmlNode](#xmlnode)
    - [Defined in](#defined-in-73)
  - [XmlTextNode](#xmltextnode)
    - [Type declaration](#type-declaration-3)
      - [#text](#%23text)
    - [Defined in](#defined-in-74)

<!-- tocstop -->

## Installation

npm:

```sh
npm install @smoores/epub
```

yarn:

```sh
yarn add @smoores/epub
```

## About

Throughout this library's documentation, there will be many references to
[the EPUB 3 specification](https://www.w3.org/TR/epub-33/). The lower level APIs
exposed by this library require some knowledge of this specification. Here we
will cover the very basics necessary to work with the library, but we recommend
that users read through the linked specification to gain a deeper understanding
of the format.

### EPUB Basics

An EPUB file is a ZIP archive with a partially specified directory and file
structure. Most of the metadata and content is specified as XML documents, with
additional resources referenced from those XML documents.

The most important of these documents is the
[package document](https://www.w3.org/TR/epub-33/#sec-package-doc).

> The package document is an XML document that consists of a set of elements
> that each encapsulate information about a particular aspect of an EPUB
> publication. These elements serve to centralize metadata, detail the
> individual resources, and provide the reading order and other information
> necessary for its rendering.

This library is primary concerned with providing access to the metadata,
manifest, and spine of the EPUB publication. Metadata refers to information
_about_ the publication, such as its title or authors. The manifest refers to
the complete set of resources that are used to render the publication, such as
XHTML documents and image files. And the spine refers to the ordered list of
manifest items that represent the default reading order &mdash; the order that
readers will encounter the manifest items by simply turning pages one at a time.

### What this library does

`@smoores/epub` provides an API to interact with the metadata, manifest, and
spine of the EPUB publication. There are higher level APIs that mostly abstract
away the implementation details of the EPUB specification, like
`epub.setTitle(title: string)` and `epub.getCreators()`, as well as lower level
APIs like `epub.writeItemContents(path: string, contents: Uint8Array)` and
`epub.addMetadata(entry: MetadataEntry)`, which require some understanding of
the EPUB structure to utilize effectively.

Because EPUB publications rely heavily on the XML document format, this library
also provides utility methods for parsing, manipulating, and building XML
documents. The underlying XML operations are based on
[fast-xml-parser](https://www.npmjs.com/package/fast-xml-parser).

## Usage

The entrypoint to the library is through the [`Epub`](#epub) class. An `Epub`
can either be read from an existing EPUB publication file, or created from
scratch.

### Reading from a file

```ts
import { Epub } from "@smoores/epub"

const epub = await Epub.from("path/to/book.epub")
console.log(await epub.getTitle())
```

### Creating from scratch

When creating an `Epub` from scratch, the `title`, `language`, and `identifier`
_must_ be provided, as these are required for all publications by the EPUB 3
specification.

Other [Dublin Core](https://www.w3.org/TR/epub-33/#sec-opf-dcmes-hd) and
non-core metadata may also be provided at creation time, or may be added
incrementally after creation.

```ts
import { randomUUID } from "node:crypto"

import { Epub } from "@smoores/epub"

const epub = await Epub.create({
  title: "S'mores For Everyone",
  // This should be the primary language of the publication.
  // Individual content resources may specify their own languages.
  language: Intl.Locale("en-US"),
  // This can be any unique identifier, including UUIDs, ISBNs, etc
  identifier: randomUUID(),
})
```

For more details about using the API, see the [API documentation](#epub).

## Development

This package lives in the
[Storyteller monorepo](https://gitlab.com/smoores/storyteller), and is developed
alongside the [Storyteller platform](https://smoores.gitlab.io/storyteller).

To get started with developing in the Storyteller monorepo, check out the
[development guides in the docs](https://smoores.gitlab.io/storyteller/docs/category/development).

## Classes

### Epub

A single EPUB instance.

The entire EPUB contents will be read into memory.

Example usage:

```ts
import { Epub, getBody, findByName, textContent } from "@smoores/epub"

const epub = await Epub.from("./path/to/book.epub")
const title = await epub.getTitle()
const spineItems = await epub.getSpineItems()
const chptOne = spineItems[0]
const chptOneXml = await epub.readXhtmlItemContents(chptOne.id)

const body = getBody(chptOneXml)
const h1 = Epub.findXmlChildByName("h1", body)
const headingText = textContent(h1)

await epub.setTitle(headingText)
await epub.writeToFile("./path/to/updated.epub")
await epub.close()
```

#### Link

https://www.w3.org/TR/epub-33/

#### Properties

##### xhtmlBuilder

> `static` **xhtmlBuilder**: `XMLBuilder`

###### Defined in

[index.ts:225](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L225)

##### xhtmlParser

> `static` **xhtmlParser**: `XMLParser`

###### Defined in

[index.ts:193](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L193)

##### xmlBuilder

> `static` **xmlBuilder**: `XMLBuilder`

###### Defined in

[index.ts:218](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L218)

##### xmlParser

> `static` **xmlParser**: `XMLParser`

###### Defined in

[index.ts:186](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L186)

#### Methods

##### addContributor()

> **addContributor**(`contributor`, `index`?): `Promise`\<`void`\>

Add a contributor to the EPUB metadata.

If index is provided, the creator will be placed at that index in the list of
creators. Otherwise, it will be added to the end of the list.

This is a convenience method for
`epub.addCreator(contributor, index, 'contributor')`.

###### Parameters

###### contributor

[`DcCreator`](README.md#dccreator)

###### index?

`number`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dccreator

###### Defined in

[index.ts:1254](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1254)

##### addCreator()

> **addCreator**(`creator`, `index`?, `type`?): `Promise`\<`void`\>

Add a creator to the EPUB metadata.

If index is provided, the creator will be placed at that index in the list of
creators. Otherwise, it will be added to the end of the list.

###### Parameters

###### creator

[`DcCreator`](README.md#dccreator)

###### index?

`number`

###### type?

`"creator"` | `"contributor"`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dccreator

###### Defined in

[index.ts:1157](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1157)

##### addManifestItem()

###### Call Signature

> **addManifestItem**(`item`, `contents`, `encoding`): `Promise`\<`void`\>

Create a new manifest item and write its contents to a new entry.

###### Parameters

###### item

[`ManifestItem`](README.md#manifestitem)

###### contents

[`ParsedXml`](README.md#parsedxml)

The new contents. May be either a parsed XML tree or a unicode string, as
determined by the `as` argument.

###### encoding

`"xml"`

Optional - whether to interpret contents as a parsed XML tree, a unicode string,
or a byte array. Defaults to a byte array.

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-manifest

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1561](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1561)

###### Call Signature

> **addManifestItem**(`item`, `contents`, `encoding`): `Promise`\<`void`\>

Create a new manifest item and write its contents to a new entry.

###### Parameters

###### item

[`ManifestItem`](README.md#manifestitem)

###### contents

`string`

The new contents. May be either a parsed XML tree or a unicode string, as
determined by the `as` argument.

###### encoding

`"utf-8"`

Optional - whether to interpret contents as a parsed XML tree, a unicode string,
or a byte array. Defaults to a byte array.

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-manifest

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1566](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1566)

###### Call Signature

> **addManifestItem**(`item`, `contents`): `Promise`\<`void`\>

Create a new manifest item and write its contents to a new entry.

###### Parameters

###### item

[`ManifestItem`](README.md#manifestitem)

###### contents

`Uint8Array`

The new contents. May be either a parsed XML tree or a unicode string, as
determined by the `as` argument.

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-manifest

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1571](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1571)

##### addMetadata()

> **addMetadata**(`entry`): `Promise`\<`void`\>

Add a new metadata entry to the Epub.

This method, like `epub.getMetadata()`, operates on metadata entries. For more
useful semantic representations of metadata, use specific methods such as
`setTitle()` and `setLanguage()`.

###### Parameters

###### entry

[`MetadataEntry`](README.md#metadataentry)

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-metadata

###### Defined in

[index.ts:1709](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1709)

##### addSpineItem()

> **addSpineItem**(`manifestId`, `index`?): `Promise`\<`void`\>

Add an item to the spine of the EPUB.

If `index` is undefined, the item will be added to the end of the spine.
Otherwise it will be inserted at the specified index.

If the manifestId does not correspond to an item in the manifest, this will
throw an error.

###### Parameters

###### manifestId

`string`

###### index?

`number`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-spine-elem

###### Defined in

[index.ts:1312](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1312)

##### addSubject()

> **addSubject**(`subject`): `Promise`\<`void`\>

Add a subject to the EPUB metadata.

###### Parameters

###### subject

May be a string representing just a schema-less subject name, or a DcSubject
object

`string` | [`DcSubject`](README.md#dcsubject)

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dcsubject

###### Defined in

[index.ts:846](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L846)

##### close()

> **close**(): `Promise`\<`void`\>

Close the Epub. Must be called before the Epub goes out of scope/is garbage
collected.

###### Returns

`Promise`\<`void`\>

###### Defined in

[index.ts:386](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L386)

##### getContributors()

> **getContributors**(): `Promise`\<[`DcCreator`](README.md#dccreator)[]\>

Retrieve the list of contributors.

This is a convenience method for `epub.getCreators('contributor')`.

###### Returns

`Promise`\<[`DcCreator`](README.md#dccreator)[]\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dccontributor

###### Defined in

[index.ts:1144](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1144)

##### getCoverImage()

> **getCoverImage**(): `Promise`\<`null` \| `Uint8Array`\>

Retrieve the cover image data as a byte array.

This does not include, for example, the cover image's filename or mime type. To
retrieve the image manifest item, use epub.getCoverImageItem().

###### Returns

`Promise`\<`null` \| `Uint8Array`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-cover-image

###### Defined in

[index.ts:771](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L771)

##### getCoverImageItem()

> **getCoverImageItem**(): `Promise`\<`null` \|
> [`ManifestItem`](README.md#manifestitem)\>

Retrieve the cover image manifest item.

This does not return the actual image data. To retrieve the image data, pass
this item's id to epub.readItemContents, or use epub.getCoverImage() instead.

###### Returns

`Promise`\<`null` \| [`ManifestItem`](README.md#manifestitem)\>

###### Link

https://www.w3.org/TR/epub-33/#sec-cover-image

###### Defined in

[index.ts:752](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L752)

##### getCreators()

> **getCreators**(`type`): `Promise`\<[`DcCreator`](README.md#dccreator)[]\>

Retrieve the list of creators.

###### Parameters

###### type

`"creator"` | `"contributor"`

###### Returns

`Promise`\<[`DcCreator`](README.md#dccreator)[]\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dccreator

###### Defined in

[index.ts:1086](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1086)

##### getLanguage()

> **getLanguage**(): `Promise`\<`null` \| `Locale`\>

Retrieve the Epub's language as specified in its package document metadata.

If no language metadata is specified, returns null. Returns the language as an
Intl.Locale instance.

###### Returns

`Promise`\<`null` \| `Locale`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dclanguage

###### Defined in

[index.ts:930](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L930)

##### getManifest()

> **getManifest**(): `Promise`\<`Record`\<`string`,
> [`ManifestItem`](README.md#manifestitem)\>\>

Retrieve the manifest for the Epub.

This is represented as a map from each manifest items' id to the rest of its
properties.

###### Returns

`Promise`\<`Record`\<`string`, [`ManifestItem`](README.md#manifestitem)\>\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-manifest

###### Defined in

[index.ts:587](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L587)

##### getMetadata()

> **getMetadata**(): `Promise`\<[`EpubMetadata`](README.md#epubmetadata)\>

Retrieve the metadata entries for the Epub.

This is represented as an array of metadata entries, in the order that they're
presented in the Epub package document.

For more useful semantic representations of metadata, use specific methods such
as `getTitle()` and `getAuthors()`.

###### Returns

`Promise`\<[`EpubMetadata`](README.md#epubmetadata)\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-metadata

###### Defined in

[index.ts:649](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L649)

##### getPublicationDate()

> **getPublicationDate**(): `Promise`\<`null` \| `Date`\>

Retrieve the publication date from the dc:date element in the EPUB metadata as a
Date object.

If there is no dc:date element, returns null.

###### Returns

`Promise`\<`null` \| `Date`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dcdate

###### Defined in

[index.ts:786](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L786)

##### getSpineItems()

> **getSpineItems**(): `Promise`\<[`ManifestItem`](README.md#manifestitem)[]\>

Retrieve the manifest items that make up the Epub's spine.

The spine specifies the order that the contents of the Epub should be displayed
to users by default.

###### Returns

`Promise`\<[`ManifestItem`](README.md#manifestitem)[]\>

###### Link

https://www.w3.org/TR/epub-33/#sec-spine-elem

###### Defined in

[index.ts:1293](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1293)

##### getSubjects()

> **getSubjects**(): `Promise`\<(`string` \|
> [`DcSubject`](README.md#dcsubject))[]\>

Retrieve the list of subjects for this EPUB.

Subjects without associated authority and term metadata will be returned as
strings. Otherwise, they will be represented as DcSubject objects, with a value,
authority, and term.

###### Returns

`Promise`\<(`string` \| [`DcSubject`](README.md#dcsubject))[]\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dcsubject

###### Defined in

[index.ts:885](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L885)

##### getTitle()

> **getTitle**(`short`): `Promise`\<`undefined` \| `string`\>

Retrieve the title of the Epub.

###### Parameters

###### short

`boolean` = `false`

Optional - whether to return only the first title segment if multiple are found.
Otherwise, will follow the spec to combine title segments

###### Returns

`Promise`\<`undefined` \| `string`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dctitle

###### Defined in

[index.ts:972](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L972)

##### getType()

> **getType**(): `Promise`\<`null` \|
> [`MetadataEntry`](README.md#metadataentry)\>

Retrieve the publication type from the dc:type element in the EPUB metadata.

If there is no dc:type element, returns null.

###### Returns

`Promise`\<`null` \| [`MetadataEntry`](README.md#metadataentry)\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dctype

###### Defined in

[index.ts:833](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L833)

##### readItemContents()

###### Call Signature

> **readItemContents**(`id`): `Promise`\<`Uint8Array`\>

Retrieve the contents of a manifest item, given its id.

###### Parameters

###### id

`string`

The id of the manifest item to retrieve

###### Returns

`Promise`\<`Uint8Array`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1418](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1418)

###### Call Signature

> **readItemContents**(`id`, `encoding`): `Promise`\<`string`\>

Retrieve the contents of a manifest item, given its id.

###### Parameters

###### id

`string`

The id of the manifest item to retrieve

###### encoding

`"utf-8"`

Optional - must be the string "utf-8". If provided, the function will encode the
data into a unicode string. Otherwise, the data will be returned as a byte
array.

###### Returns

`Promise`\<`string`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1419](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1419)

##### readXhtmlItemContents()

###### Call Signature

> **readXhtmlItemContents**(`id`, `as`?):
> `Promise`\<[`ParsedXml`](README.md#parsedxml)\>

Retrieves the contents of an XHTML item, given its manifest id.

###### Parameters

###### id

`string`

The id of the manifest item to retrieve

###### as?

`"xhtml"`

Optional - whether to return the parsed XML document tree, or the concatenated
text of the document. Defaults to the parsed XML tree.

###### Returns

`Promise`\<[`ParsedXml`](README.md#parsedxml)\>

###### Link

https://www.w3.org/TR/epub-33/#sec-xhtml

###### Defined in

[index.ts:1447](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1447)

###### Call Signature

> **readXhtmlItemContents**(`id`, `as`): `Promise`\<`string`\>

Retrieves the contents of an XHTML item, given its manifest id.

###### Parameters

###### id

`string`

The id of the manifest item to retrieve

###### as

`"text"`

Optional - whether to return the parsed XML document tree, or the concatenated
text of the document. Defaults to the parsed XML tree.

###### Returns

`Promise`\<`string`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-xhtml

###### Defined in

[index.ts:1448](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1448)

##### removeSpineItem()

> **removeSpineItem**(`index`): `Promise`\<`void`\>

Remove the spine item at the specified index.

###### Parameters

###### index

`number`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-spine-elem

###### Defined in

[index.ts:1365](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1365)

##### replaceMetadata()

> **replaceMetadata**(`predicate`, `entry`): `Promise`\<`void`\>

Replace a metadata entry with a new one.

The `predicate` argument will be used to determine which entry to replace. The
first metadata entry that matches the predicate will be replaced.

###### Parameters

###### predicate

(`entry`) => `boolean`

Calls predicate once for each metadata entry, until it finds one where predicate
returns true

###### entry

[`MetadataEntry`](README.md#metadataentry)

The new entry to replace the found entry with

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-metadata

###### Defined in

[index.ts:1759](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1759)

##### setLanguage()

> **setLanguage**(`locale`): `Promise`\<`void`\>

Update the Epub's language metadata entry.

Updates the existing dc:language element if one exists. Otherwise creates a new
element

###### Parameters

###### locale

`Locale`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dclanguage

###### Defined in

[index.ts:955](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L955)

##### setPublicationDate()

> **setPublicationDate**(`date`): `Promise`\<`void`\>

Set the dc:date metadata element with the provided date.

Updates the existing dc:date element if one exists. Otherwise creates a new
element

###### Parameters

###### date

`Date`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dcdate

###### Defined in

[index.ts:801](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L801)

##### setTitle()

> **setTitle**(`title`): `Promise`\<`void`\>

Set the title of the Epub.

If a title already exists, only the first title metadata entry will be modified
to match the new value.

If no title currently exists, a single title metadata entry will be created.

###### Parameters

###### title

`string`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dctitle

###### Defined in

[index.ts:1047](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1047)

##### setType()

> **setType**(`type`): `Promise`\<`void`\>

Set the dc:type metadata element.

Updates the existing dc:type element if one exists. Otherwise creates a new
element.

###### Parameters

###### type

`string`

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-opf-dctype

###### Defined in

[index.ts:817](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L817)

##### updateManifestItem()

> **updateManifestItem**(`id`, `newItem`): `Promise`\<`void`\>

Update the manifest entry for an existing item.

To update the contents of an entry, use `epub.writeItemContents()` or
`epub.writeXhtmlItemContents()`

###### Parameters

###### id

`string`

###### newItem

`Omit`\<[`ManifestItem`](README.md#manifestitem), `"id"`\>

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-pkg-manifest

###### Defined in

[index.ts:1646](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1646)

##### writeItemContents()

###### Call Signature

> **writeItemContents**(`id`, `contents`): `Promise`\<`void`\>

Write new contents for an existing manifest item, specified by its id.

The id must reference an existing manifest item. If creating a new item, use
`epub.addManifestItem()` instead.

###### Parameters

###### id

`string`

The id of the manifest item to write new contents for

###### contents

`Uint8Array`

The new contents. May be either a utf-8 encoded string or a byte array, as
determined by the encoding

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1500](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1500)

###### Call Signature

> **writeItemContents**(`id`, `contents`, `encoding`): `Promise`\<`void`\>

Write new contents for an existing manifest item, specified by its id.

The id must reference an existing manifest item. If creating a new item, use
`epub.addManifestItem()` instead.

###### Parameters

###### id

`string`

The id of the manifest item to write new contents for

###### contents

`string`

The new contents. May be either a utf-8 encoded string or a byte array, as
determined by the encoding

###### encoding

`"utf-8"`

Optional - must be the string "utf-8". If provided, the contents will be
interpreted as a unicode string. Otherwise, the contents must be a byte array.

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-contentdocs

###### Defined in

[index.ts:1501](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1501)

##### writeToFile()

> **writeToFile**(`path`): `Promise`\<`void`\>

Write the current contents of the Epub to a new EPUB archive on disk.

This _does not_ close the Epub. It can continue to be modified after it has been
written to disk. Use `epub.close()` to close the Epub.

When this method is called, the "dcterms:modified" meta tag is automatically
updated to the current UTC timestamp.

###### Parameters

###### path

`string`

The file path to write the new archive to. The parent directory does not need te
exist -- the path will be recursively created.

###### Returns

`Promise`\<`void`\>

###### Defined in

[index.ts:1824](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1824)

##### writeXhtmlItemContents()

> **writeXhtmlItemContents**(`id`, `contents`): `Promise`\<`void`\>

Write new contents for an existing XHTML item, specified by its id.

The id must reference an existing manifest item. If creating a new item, use
`epub.addManifestItem()` instead.

###### Parameters

###### id

`string`

The id of the manifest item to write new contents for

###### contents

[`ParsedXml`](README.md#parsedxml)

The new contents. Must be a parsed XML tree.

###### Returns

`Promise`\<`void`\>

###### Link

https://www.w3.org/TR/epub-33/#sec-xhtml

###### Defined in

[index.ts:1540](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L1540)

##### addLinkToXhtmlHead()

> `static` **addLinkToXhtmlHead**(`xml`, `link`): `void`

Given an XML structure representing a complete XHTML document, add a `link`
element to the `head` of the document.

This method modifies the provided XML structure.

###### Parameters

###### xml

[`ParsedXml`](README.md#parsedxml)

###### link

###### href

`string`

###### rel

`string`

###### type

`string`

###### Returns

`void`

###### Defined in

[index.ts:255](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L255)

##### create()

> `static` **create**(`dublinCore`, `additionalMetadata`):
> `Promise`\<[`Epub`](README.md#epub)\>

Construct an Epub instance, optionally beginning with the provided metadata.

###### Parameters

###### dublinCore

[`DublinCore`](README.md#dublincore)

Core metadata terms

###### additionalMetadata

[`EpubMetadata`](README.md#epubmetadata) = `[]`

An array of additional metadata entries

###### Returns

`Promise`\<[`Epub`](README.md#epub)\>

###### Defined in

[index.ts:402](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L402)

##### findXmlChildByName()

> `static` **findXmlChildByName**\<`Name`\>(`name`, `xml`, `filter`?):
> `undefined` \| [`XmlElement`](README.md#xmlelementname)\<`Name`\>

Given an XML structure, find the first child matching the provided name and
optional filter.

###### Type Parameters

• **Name** _extends_ \`a$\{string\}\` \| \`b$\{string\}\` \|
\`c$\{string\}\` \| \`d$\{string\}\` \| \`e$\{string\}\` \| \`f$\{string\}\` \|
\`g$\{string\}\` \| \`h$\{string\}\` \| \`i$\{string\}\` \| \`j$\{string\}\` \|
\`k$\{string\}\` \| \`l$\{string\}\` \| \`m$\{string\}\` \| \`n$\{string\}\` \|
\`o$\{string\}\` \| \`p$\{string\}\` \| \`q$\{string\}\` \| \`r$\{string\}\` \|
\`s$\{string\}\` \| \`t$\{string\}\` \| \`u$\{string\}\` \| \`v$\{string\}\` \|
\`w$\{string\}\` \| \`x$\{string\}\` \| \`y$\{string\}\` \| \`z$\{string\}\` \|
\`A$\{string\}\` \| \`B$\{string\}\` \| \`C$\{string\}\` \| \`D$\{string\}\` \|
\`E$\{string\}\` \| \`F$\{string\}\` \| \`G$\{string\}\` \| \`H$\{string\}\` \|
\`I$\{string\}\` \| \`J$\{string\}\` \| \`K$\{string\}\` \| \`L$\{string\}\` \|
\`M$\{string\}\` \| \`N$\{string\}\` \| \`O$\{string\}\` \| \`P$\{string\}\` \|
\`Q$\{string\}\` \| \`R$\{string\}\` \| \`S$\{string\}\` \| \`T$\{string\}\` \|
\`U$\{string\}\` \| \`V$\{string\}\` \| \`W$\{string\}\` \| \`X$\{string\}\` \|
\`Y$\{string\}\` \| \`Z$\{string\}\`

###### Parameters

###### name

`Name`

###### xml

[`ParsedXml`](README.md#parsedxml)

###### filter?

(`node`) => `boolean`

###### Returns

`undefined` \| [`XmlElement`](README.md#xmlelementname)\<`Name`\>

###### Defined in

[index.ts:339](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L339)

##### formatSmilDuration()

> `static` **formatSmilDuration**(`duration`): `string`

Format a duration, provided as a number of seconds, as a SMIL clock value, to be
used for Media Overlays.

###### Parameters

###### duration

`number`

###### Returns

`string`

###### Link

https://www.w3.org/TR/epub-33/#sec-duration

###### Defined in

[index.ts:238](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L238)

##### from()

> `static` **from**(`path`): `Promise`\<[`Epub`](README.md#epub)\>

Construct an Epub instance by reading an EPUB file from `path`.

###### Parameters

###### path

`string`

Must be a valid filepath to an EPUB archive

###### Returns

`Promise`\<[`Epub`](README.md#epub)\>

###### Defined in

[index.ts:481](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L481)

##### getXhtmlBody()

> `static` **getXhtmlBody**(`xml`): [`ParsedXml`](README.md#parsedxml)

Given an XML structure representing a complete XHTML document, return the
sub-structure representing the children of the document's body element.

###### Parameters

###### xml

[`ParsedXml`](README.md#parsedxml)

###### Returns

[`ParsedXml`](README.md#parsedxml)

###### Defined in

[index.ts:280](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L280)

##### getXhtmlTextContent()

> `static` **getXhtmlTextContent**(`xml`): `string`

Given an XML structure representing a complete XHTML document, return a string
representing the concatenation of all text nodes in the document.

###### Parameters

###### xml

[`ParsedXml`](README.md#parsedxml)

###### Returns

`string`

###### Defined in

[index.ts:295](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L295)

##### getXmlChildren()

> `static` **getXmlChildren**\<`Name`\>(`element`):
> [`ParsedXml`](README.md#parsedxml)

Given an XMLElement, return a list of its children

###### Type Parameters

• **Name** _extends_ \`a$\{string\}\` \| \`b$\{string\}\` \|
\`c$\{string\}\` \| \`d$\{string\}\` \| \`e$\{string\}\` \| \`f$\{string\}\` \|
\`g$\{string\}\` \| \`h$\{string\}\` \| \`i$\{string\}\` \| \`j$\{string\}\` \|
\`k$\{string\}\` \| \`l$\{string\}\` \| \`m$\{string\}\` \| \`n$\{string\}\` \|
\`o$\{string\}\` \| \`p$\{string\}\` \| \`q$\{string\}\` \| \`r$\{string\}\` \|
\`s$\{string\}\` \| \`t$\{string\}\` \| \`u$\{string\}\` \| \`v$\{string\}\` \|
\`w$\{string\}\` \| \`x$\{string\}\` \| \`y$\{string\}\` \| \`z$\{string\}\` \|
\`A$\{string\}\` \| \`B$\{string\}\` \| \`C$\{string\}\` \| \`D$\{string\}\` \|
\`E$\{string\}\` \| \`F$\{string\}\` \| \`G$\{string\}\` \| \`H$\{string\}\` \|
\`I$\{string\}\` \| \`J$\{string\}\` \| \`K$\{string\}\` \| \`L$\{string\}\` \|
\`M$\{string\}\` \| \`N$\{string\}\` \| \`O$\{string\}\` \| \`P$\{string\}\` \|
\`Q$\{string\}\` \| \`R$\{string\}\` \| \`S$\{string\}\` \| \`T$\{string\}\` \|
\`U$\{string\}\` \| \`V$\{string\}\` \| \`W$\{string\}\` \| \`X$\{string\}\` \|
\`Y$\{string\}\` \| \`Z$\{string\}\`

###### Parameters

###### element

[`XmlElement`](README.md#xmlelementname)\<`Name`\>

###### Returns

[`ParsedXml`](README.md#parsedxml)

###### Defined in

[index.ts:327](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L327)

##### getXmlElementName()

> `static` **getXmlElementName**\<`Name`\>(`element`): `Name`

Given an XMLElement, return its tag name.

###### Type Parameters

• **Name** _extends_ \`a$\{string\}\` \| \`b$\{string\}\` \|
\`c$\{string\}\` \| \`d$\{string\}\` \| \`e$\{string\}\` \| \`f$\{string\}\` \|
\`g$\{string\}\` \| \`h$\{string\}\` \| \`i$\{string\}\` \| \`j$\{string\}\` \|
\`k$\{string\}\` \| \`l$\{string\}\` \| \`m$\{string\}\` \| \`n$\{string\}\` \|
\`o$\{string\}\` \| \`p$\{string\}\` \| \`q$\{string\}\` \| \`r$\{string\}\` \|
\`s$\{string\}\` \| \`t$\{string\}\` \| \`u$\{string\}\` \| \`v$\{string\}\` \|
\`w$\{string\}\` \| \`x$\{string\}\` \| \`y$\{string\}\` \| \`z$\{string\}\` \|
\`A$\{string\}\` \| \`B$\{string\}\` \| \`C$\{string\}\` \| \`D$\{string\}\` \|
\`E$\{string\}\` \| \`F$\{string\}\` \| \`G$\{string\}\` \| \`H$\{string\}\` \|
\`I$\{string\}\` \| \`J$\{string\}\` \| \`K$\{string\}\` \| \`L$\{string\}\` \|
\`M$\{string\}\` \| \`N$\{string\}\` \| \`O$\{string\}\` \| \`P$\{string\}\` \|
\`Q$\{string\}\` \| \`R$\{string\}\` \| \`S$\{string\}\` \| \`T$\{string\}\` \|
\`U$\{string\}\` \| \`V$\{string\}\` \| \`W$\{string\}\` \| \`X$\{string\}\` \|
\`Y$\{string\}\` \| \`Z$\{string\}\`

###### Parameters

###### element

[`XmlElement`](README.md#xmlelementname)\<`Name`\>

###### Returns

`Name`

###### Defined in

[index.ts:312](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L312)

##### isXmlTextNode()

> `static` **isXmlTextNode**(`node`): `node is XmlTextNode`

Given an XMLNode, determine whether it represents a text node or an XML element.

###### Parameters

###### node

[`XmlNode`](README.md#xmlnode)

###### Returns

`node is XmlTextNode`

###### Defined in

[index.ts:352](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L352)

## Interfaces

### AlternateScript

#### Properties

##### locale

> **locale**: `Locale`

###### Defined in

[index.ts:137](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L137)

##### name

> **name**: `string`

###### Defined in

[index.ts:136](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L136)

---

### DcCreator

#### Properties

##### alternateScripts?

> `optional` **alternateScripts**:
> [`AlternateScript`](README.md#alternatescript)[]

###### Defined in

[index.ts:144](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L144)

##### fileAs?

> `optional` **fileAs**: `string`

###### Defined in

[index.ts:143](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L143)

##### name

> **name**: `string`

###### Defined in

[index.ts:141](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L141)

##### role?

> `optional` **role**: `string`

###### Defined in

[index.ts:142](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L142)

---

### DcSubject

#### Properties

##### authority

> **authority**: `string`

###### Defined in

[index.ts:131](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L131)

##### term

> **term**: `string`

###### Defined in

[index.ts:132](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L132)

##### value

> **value**: `string`

###### Defined in

[index.ts:130](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L130)

---

### DublinCore

#### Properties

##### contributors?

> `optional` **contributors**: [`DcCreator`](README.md#dccreator)[]

###### Defined in

[index.ts:154](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L154)

##### creators?

> `optional` **creators**: [`DcCreator`](README.md#dccreator)[]

###### Defined in

[index.ts:153](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L153)

##### date?

> `optional` **date**: `Date`

###### Defined in

[index.ts:151](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L151)

##### identifier

> **identifier**: `string`

###### Defined in

[index.ts:150](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L150)

##### language

> **language**: `Locale`

###### Defined in

[index.ts:149](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L149)

##### subjects?

> `optional` **subjects**: (`string` \| [`DcSubject`](README.md#dcsubject))[]

###### Defined in

[index.ts:152](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L152)

##### title

> **title**: `string`

###### Defined in

[index.ts:148](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L148)

##### type?

> `optional` **type**: `string`

###### Defined in

[index.ts:155](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L155)

## Type Aliases

### ElementName

> **ElementName**: \`$\{Letter \| Uppercase\<Letter\>\}$\{string\}\`

A valid name for an XML element (must start with a letter)

#### Defined in

[index.ts:59](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L59)

---

### EpubMetadata

> **EpubMetadata**: [`MetadataEntry`](README.md#metadataentry)[]

#### Defined in

[index.ts:127](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L127)

---

### ManifestItem

> **ManifestItem**: `object`

#### Type declaration

##### fallback?

> `optional` **fallback**: `string`

##### href

> **href**: `string`

##### id

> **id**: `string`

##### mediaOverlay?

> `optional` **mediaOverlay**: `string`

##### mediaType

> **mediaType**: `string`

##### properties?

> `optional` **properties**: `string`[]

#### Defined in

[index.ts:77](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L77)

---

### MetadataEntry

> **MetadataEntry**: `object`

#### Type declaration

##### id?

> `optional` **id**: `string`

##### properties

> **properties**: `Record`\<`string`, `string`\>

##### type

> **type**: [`ElementName`](README.md#elementname)

##### value

> **value**: `string` \| `undefined`

#### Defined in

[index.ts:120](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L120)

---

### ParsedXml

> **ParsedXml**: [`XmlNode`](README.md#xmlnode)[]

An XML structure

#### Defined in

[index.ts:75](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L75)

---

### XmlElement\<Name\>

> **XmlElement**\<`Name`\>: `object` & `{ [key in Name]: ParsedXml }`

An XML element, e.g. <meta>

#### Type declaration

##### :@?

> `optional` **:@**: `Record`\<`string`, `string`\>

#### Type Parameters

• **Name** _extends_ [`ElementName`](README.md#elementname) =
[`ElementName`](README.md#elementname)

#### Defined in

[index.ts:62](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L62)

---

### XmlNode

> **XmlNode**: [`XmlElement`](README.md#xmlelementname) \|
> [`XmlTextNode`](README.md#xmltextnode)

A valid XML node. May be either an element or a text node.

#### Defined in

[index.ts:72](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L72)

---

### XmlTextNode

> **XmlTextNode**: `object`

A text node in an XML document

#### Type declaration

##### #text

> **#text**: `string`

#### Defined in

[index.ts:69](https://gitlab.com/smoores/storyteller/-/blob/main/epub/index.ts#L69)
