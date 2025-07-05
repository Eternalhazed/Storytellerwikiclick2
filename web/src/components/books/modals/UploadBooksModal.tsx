import { Collection } from "@/database/collections"
import { Button, Modal, Text } from "@mantine/core"
import { useState } from "react"
import Uppy from "@uppy/core"
import Tus from "@uppy/tus"
import Dashboard from "@uppy/react/lib/Dashboard"
import useUppyEvent from "@uppy/react/lib/useUppyEvent"

import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"
import { Epub } from "@smoores/epub"
import BookThumbnailGenerator from "@/uppyPlugins/BookThumbnailGenerator/BookThumbnailGenerator"
import { parseBlob, selectCover } from "music-metadata"

interface Props {
  isOpen: boolean
  onClose: () => void
  collection?: Collection | undefined
}

export function UploadBooksModal({ isOpen, onClose, collection }: Props) {
  const [isEpubAligned, setIsEpubAligned] = useState(false)
  const [isEpubComplete, setIsEpubComplete] = useState(false)
  const [isAudioComplete, setIsAudioComplete] = useState(false)

  const [epubUppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["application/epub+zip"],
      },
    })
      .use(Tus, {
        endpoint: "/api/v2/books/upload",
      })
      .use(BookThumbnailGenerator, {
        thumbnailFactories: {
          "application/epub+zip": async (file) => {
            const arrayBuffer = await file.data.arrayBuffer()
            const data = new Uint8Array(arrayBuffer)
            const epub = await Epub.from(data)
            const coverData = await epub.getCoverImage()
            if (!coverData) return null
            return new Blob([coverData])
          },
        },
      }),
  )

  const [audioUppy] = useState(() =>
    new Uppy({
      restrictions: { allowedFileTypes: ["video/mp4", "audio/*", ".m4b"] },
    })
      .use(Tus, { endpoint: "/api/v2/books/upload" })
      .use(BookThumbnailGenerator, {
        thumbnailFactories: {
          "video/*,audio/*,.m4b": async (file) => {
            const { common } = await parseBlob(file.data)
            const coverImage = selectCover(common.picture)
            if (!coverImage) return null

            return new Blob([coverImage.data])
          },
        },
      }),
  )

  useUppyEvent(epubUppy, "file-added", async (file) => {
    const arrayBuffer = await file.data.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)
    const epub = await Epub.from(data)
    const manifest = await epub.getManifest()
    const isAligned = Object.values(manifest).some((item) => item.mediaOverlay)
    setIsEpubAligned(isAligned)
    if (isAligned) audioUppy.clear()
  })

  useUppyEvent(epubUppy, "file-removed", () => {
    setIsEpubAligned(false)
  })

  useUppyEvent(epubUppy, "complete", () => {
    setIsEpubComplete(true)
  })

  useUppyEvent(audioUppy, "complete", () => {
    setIsAudioComplete(true)
  })

  function reset() {
    epubUppy.clear()
    audioUppy.clear()
    setIsEpubComplete(false)
    setIsAudioComplete(false)
    setIsEpubAligned(false)
  }

  const complete = isEpubComplete && isAudioComplete

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        reset()
        onClose()
      }}
      title="Upload book"
      centered
      classNames={{
        body: "flex flex-col gap-4",
      }}
    >
      {/* <p>Upload an EPUB file or a set of audio files for an audiobook</p>
      <FileButton
        accept="application/epub+zip"
        {...form.getInputProps("epubFile")}
      >
        {(props) => <Button {...props}>Choose file...</Button>}
      </FileButton> */}
      <Dashboard
        id="EbookDashboard"
        uppy={epubUppy}
        height={122}
        showProgressDetails
        hideUploadButton
        singleFileFullScreen
        proudlyDisplayPoweredByUppy={false}
        disableThumbnailGenerator
        fileManagerSelectionType="files"
        locale={{
          // @ts-expect-error This is typed incorrectly — partials are fine
          strings: {
            dropPasteFiles:
              "Drop EPUB files (plain or with immersive reading) here or %{browseFiles}",
          },
        }}
      />
      {isEpubAligned && (
        <Text className="text-center">
          This EPUB file already has audio for immersive reading, so you don’t
          need to upload the audio separately!
        </Text>
      )}
      <Dashboard
        id="AudiobookDashboard"
        disabled={isEpubAligned}
        uppy={audioUppy}
        height={300}
        showProgressDetails
        hideUploadButton
        singleFileFullScreen={false}
        proudlyDisplayPoweredByUppy={false}
        disableThumbnailGenerator
        fileManagerSelectionType="both"
        locale={{
          // @ts-expect-error This is typed incorrectly — partials are fine
          strings: {
            dropPasteBoth:
              "Drop audio files here, %{browseFiles} or %{browseFolders}",
          },
        }}
      />
      <Button
        disabled={!epubUppy.getFiles().length && !audioUppy.getFiles().length}
        onClick={() => {
          if (complete) {
            reset()
            return
          }

          const bookUuid = crypto.randomUUID()

          epubUppy.getFiles().forEach((file) => {
            file.meta["bookUuid"] = bookUuid
            file.meta["collection"] = collection?.uuid
          })
          audioUppy.getFiles().forEach((file) => {
            file.meta["bookUuid"] = bookUuid
            file.meta["collection"] = collection?.uuid
          })

          epubUppy.upload().catch((e: unknown) => {
            console.error(e)
          })
          audioUppy.upload().catch((e: unknown) => {
            console.error(e)
          })
        }}
      >
        {complete ? "Done! Upload another?" : "Upload"}
      </Button>
    </Modal>
  )
}
