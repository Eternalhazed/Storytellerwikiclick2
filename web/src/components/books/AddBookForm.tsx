"use client"

import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react"
import { useCallback, useState, MouseEvent, FormEvent, Fragment } from "react"
import styles from "./addbookform.module.css"
import { useApiClient } from "@/hooks/useApiClient"
import { ProgressBar } from "./ProgressBar"
import { usePermission } from "@/contexts/UserPermissions"
import { ServerFilePicker } from "./ServerFilePicker"
import {
  Button,
  ButtonGroup,
  Fieldset,
  FileButton,
  Group,
  Stack,
  Text,
} from "@mantine/core"
import { IconX } from "@tabler/icons-react"

function round(n: number, r: number) {
  return Math.round(n * Math.pow(10, r)) / Math.pow(10, r)
}

function formatBytes(bytes: number) {
  const kilobytes = round(bytes / 1000, 2)
  if (kilobytes < 1) return `${bytes} B`
  const megabytes = round(kilobytes / 1000, 2)
  if (megabytes < 1) return `${kilobytes} KB`
  const gigabytes = round(megabytes / 1000, 2)
  if (gigabytes < 1) return `${megabytes} MB`
  return `${gigabytes.toFixed(2)} GB`
}

enum UploadState {
  CLEAN = "CLEAN",
  UPLOADING = "UPLOADING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export function AddBookForm() {
  const [fileSource, setFileSource] = useState<"upload" | "server">("upload")
  const [openDialog, setOpenDialog] = useState<"epub" | "audio" | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [epubFile, setEpubFile] = useState<File | null>(null)
  const [audioFiles, setAudioFiles] = useState<File[] | null>(null)
  const [epubPath, setEpubPath] = useState<string | null>(null)
  const [audioPaths, setAudioPaths] = useState<string[] | null>(null)
  const [currentUploadIndex, setCurrentUploadIndex] = useState<number | null>(
    null,
  )
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const [uploadState, setUploadState] = useState<UploadState>(UploadState.CLEAN)

  const resetState = useCallback((event: MouseEvent) => {
    event.preventDefault()
    setShowForm(true)
    setEpubFile(null)
    setAudioFiles(null)
    setEpubPath(null)
    setAudioPaths(null)
    setCurrentUploadIndex(null)
    setUploadProgress(null)
    setUploadState(UploadState.CLEAN)
  }, [])

  const client = useApiClient()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setUploadState(UploadState.UPLOADING)
    if (fileSource === "upload") {
      if (epubFile === null || audioFiles === null) return
      try {
        await client.createBook(epubFile, audioFiles, (event) => {
          if (event.progress === 1) {
            setCurrentUploadIndex((p) => (p === null ? 0 : p + 1))
          }
          setUploadProgress(event.progress ?? null)
        })
      } catch (_) {
        setUploadState(UploadState.ERROR)
        return
      }
    } else {
      try {
        if (epubPath === null || audioPaths === null) return
        await client.createBook(epubPath, audioPaths)
      } catch (_) {
        setUploadState(UploadState.ERROR)
        return
      }
    }

    setUploadState(UploadState.SUCCESS)
  }

  const canAddBook = usePermission("book_create")

  if (!canAddBook) return null

  return (
    <Stack className="max-w-[600px] rounded-md bg-gray-200 py-8">
      <Dialog
        className={styles["server-files-dialog"]}
        open={fileSource === "server" && openDialog !== null}
        unmountOnHide
        hideOnEscape
        hideOnInteractOutside
        onClose={() => {
          setOpenDialog(null)
        }}
      >
        <DialogDismiss className={styles["dialog-dismiss"]} />
        <DialogHeading>
          Choose {openDialog === "epub" ? "file" : "files"} from server
        </DialogHeading>
        {openDialog === "audio" ? (
          <ServerFilePicker
            allowedExtensions={[".mp4", ".mp3", ".zip", ".m4b", ".m4a"]}
            multiple
            onChange={(files) => {
              setAudioPaths(files)
              setOpenDialog(null)
            }}
          />
        ) : (
          <ServerFilePicker
            allowedExtensions={[".epub"]}
            onChange={(file) => {
              setEpubPath(file)
              setOpenDialog(null)
            }}
          />
        )}
      </Dialog>
      {showForm ? (
        <form onSubmit={onSubmit}>
          <Group justify="center">
            <ButtonGroup>
              <Button
                className="[button&]:rounded-r-none"
                variant={fileSource === "upload" ? "filled" : "white"}
                onClick={() => {
                  setFileSource("upload")
                }}
              >
                Upload files
              </Button>
              <Button
                className="[button&]:rounded-l-none"
                variant={fileSource === "server" ? "filled" : "white"}
                onClick={() => {
                  setFileSource("server")
                }}
              >
                Choose from server
              </Button>
            </ButtonGroup>
          </Group>
          <Fieldset variant="unstyled">
            <Stack justify="space-around">
              <Stack align="center">
                {fileSource === "upload" ? (
                  <FileButton
                    accept="application/epub+zip"
                    onChange={(file) => {
                      setEpubFile(file)
                    }}
                  >
                    {(props) => (
                      <Button variant="default" {...props}>
                        EPUB file
                      </Button>
                    )}
                  </FileButton>
                ) : (
                  <Button
                    variant="default"
                    onClick={() => {
                      setOpenDialog("epub")
                    }}
                  >
                    EPUB file
                  </Button>
                )}
                {epubFile !== null && (
                  <Group>
                    <Text>{epubFile.name}</Text>
                    <Text>{formatBytes(epubFile.size)}</Text>
                    <Button
                      variant="subtle"
                      size="compact-xs"
                      onClick={() => {
                        setEpubFile(null)
                      }}
                    >
                      <IconX />
                    </Button>
                  </Group>
                )}
                {epubPath !== null && (
                  <Group>
                    <Text>{epubPath}</Text>
                    <Button
                      variant="subtle"
                      size="compact-xs"
                      onClick={() => {
                        setEpubPath(null)
                      }}
                    >
                      <IconX />
                    </Button>
                  </Group>
                )}
              </Stack>
              <Stack align="center">
                {fileSource === "upload" ? (
                  <FileButton
                    accept="application/zip,audio/mpeg,audio/mp4,video/mp4"
                    multiple
                    onChange={(files) => {
                      setAudioFiles(files)
                    }}
                  >
                    {(props) => (
                      <Button variant="default" {...props}>
                        Audio files
                      </Button>
                    )}
                  </FileButton>
                ) : (
                  <Button
                    variant="default"
                    onClick={() => {
                      setOpenDialog("audio")
                    }}
                  >
                    Audio files
                  </Button>
                )}
                {audioFiles !== null && (
                  <>
                    <Group>
                      <Text>Total: </Text>
                      <Text>
                        {formatBytes(
                          Array.from(audioFiles).reduce(
                            (acc, f) => acc + f.size,
                            0,
                          ),
                        )}
                      </Text>
                    </Group>
                    <Stack gap={0}>
                      {audioFiles.map((file) => (
                        <Fragment key={file.name}>
                          <Group justify="stretch">
                            <Group justify="space-between" className="grow">
                              <Text>{file.name}</Text>
                              <Text>{formatBytes(file.size)}</Text>
                            </Group>
                            <Button
                              variant="subtle"
                              size="compact-xs"
                              onClick={() => {
                                setAudioFiles(
                                  (prev) =>
                                    prev?.filter((value) => value !== file) ??
                                    null,
                                )
                              }}
                            >
                              <IconX />
                            </Button>
                          </Group>
                        </Fragment>
                      ))}
                    </Stack>
                  </>
                )}

                {audioPaths !== null && `${audioPaths.length} files`}
              </Stack>
            </Stack>
          </Fieldset>
          {uploadState === UploadState.SUCCESS ? (
            <>
              <span>Done!</span>
              <Button type="reset" onClick={resetState}>
                Add another book
              </Button>
            </>
          ) : uploadState === UploadState.ERROR ? (
            <>
              <span>Failed - check your server logs for more details</span>
              <Button type="reset" onClick={resetState}>
                Try again
              </Button>
            </>
          ) : (
            <>
              {uploadState === UploadState.UPLOADING &&
                uploadProgress !== null && (
                  <div className={styles["progress-container"]}>
                    <span>
                      {currentUploadIndex === null
                        ? epubFile?.name
                        : audioFiles?.[currentUploadIndex]?.name ??
                          "Processing..."}
                    </span>
                    <ProgressBar progress={uploadProgress * 100} />
                  </div>
                )}
              <Group justify="space-between" px="lg">
                <Button type="reset" variant="white" onClick={resetState}>
                  Clear
                </Button>
                <Button
                  type="submit"
                  disabled={
                    (fileSource === "upload" &&
                      (epubFile === null || audioFiles === null)) ||
                    (fileSource === "server" &&
                      (epubPath === null || audioPaths === null)) ||
                    uploadState !== UploadState.CLEAN
                  }
                >
                  Create
                </Button>
              </Group>
            </>
          )}
        </form>
      ) : (
        <Button
          className="self-center"
          variant="white"
          onClick={() => {
            setShowForm(true)
          }}
        >
          + Add book
        </Button>
      )}
    </Stack>
  )
}
