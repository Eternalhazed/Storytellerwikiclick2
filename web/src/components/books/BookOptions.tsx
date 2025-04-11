import { BookDetail } from "@/apiModels"
import { useApiClient } from "@/hooks/useApiClient"
import { usePermissions } from "@/contexts/UserPermissions"
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core"
import {
  IconPencil,
  IconTrash,
  IconProgress,
  IconProgressX,
  IconReload,
  IconTextRecognition,
} from "@tabler/icons-react"
import NextLink from "next/link"
import { useDisclosure } from "@mantine/hooks"
import {
  ProcessingTaskStatus,
  ProcessingTaskType,
} from "@/apiModels/models/ProcessingStatus"

type Props = {
  book: BookDetail
  synchronized: boolean
  showTTS: boolean
}

export function BookOptions({ book, synchronized, showTTS }: Props) {
  const [opened, { open, close }] = useDisclosure()
  const client = useApiClient()
  const permissions = usePermissions()

  // Check if transcription failed
  const transcriptionFailed =
    book.processing_status?.current_task ===
      ProcessingTaskType.TRANSCRIBE_CHAPTERS &&
    book.processing_status.status === ProcessingTaskStatus.IN_ERROR

  const isProcessing =
    book.processing_status?.is_processing || book.processing_status?.is_queued

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Deleting book"
        centered
        size="sm"
      >
        <Stack>
          Are you sure you want to delete {book.title} by{" "}
          {book.authors[0]?.name}?
          <Group justify="space-between">
            <Button variant="subtle" onClick={close}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                void client.deleteBook(book.uuid)
              }}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Stack>
        {permissions.book_update && (
          <ActionIcon
            component={NextLink}
            variant="subtle"
            color="black"
            href={`/books/${book.uuid}`}
          >
            <Tooltip position="right" label="Edit">
              <IconPencil aria-label="Edit" />
            </Tooltip>
          </ActionIcon>
        )}

        {/* Processing options - modified condition to ensure visibility */}
        {permissions.book_process &&
          book.processing_status &&
          (isProcessing ? (
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={() => client.cancelProcessing(book.uuid)}
            >
              <Tooltip
                position="right"
                label={
                  book.processing_status.is_queued
                    ? "Remove from queue"
                    : "Stop processing"
                }
              >
                <IconProgressX
                  aria-label={
                    book.processing_status.is_queued
                      ? "Remove from queue"
                      : "Stop processing"
                  }
                />
              </Tooltip>
            </ActionIcon>
          ) : (
            <Menu position="left-start">
              <Menu.Target>
                <ActionIcon color="black" variant="subtle">
                  <Tooltip position="right" label="Processing">
                    <IconProgress aria-label="Processing" />
                  </Tooltip>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  classNames={{ itemLabel: "flex gap-2" }}
                  onClick={() => client.processBook(book.uuid, false)}
                >
                  <IconProgress aria-hidden />{" "}
                  {synchronized
                    ? "Re-process (using cached files)"
                    : showTTS
                      ? "Generate audio"
                      : "Continue"}
                </Menu.Item>

                <Menu.Item
                  classNames={{ itemLabel: "flex gap-2" }}
                  {...(transcriptionFailed ? { color: "red", fw: "bold" } : {})}
                  onClick={() => client.restartTranscription(book.uuid)}
                >
                  <IconTextRecognition
                    aria-hidden
                    color={transcriptionFailed ? "red" : undefined}
                  />
                  {transcriptionFailed
                    ? "Fix failed transcription"
                    : "Restart transcription"}
                </Menu.Item>

                {!showTTS && (
                  <Menu.Item
                    classNames={{ itemLabel: "flex gap-2" }}
                    onClick={() => client.processBook(book.uuid, true)}
                  >
                    <IconReload aria-hidden /> Delete cache and re-process from
                    source files
                  </Menu.Item>
                )}

                <Menu.Item
                  classNames={{ itemLabel: "flex gap-2" }}
                  onClick={() => client.deleteBookAssets(book.uuid)}
                >
                  <IconReload aria-hidden /> Delete cache files
                </Menu.Item>

                {synchronized ? (
                  <Menu.Item
                    classNames={{ itemLabel: "flex gap-2" }}
                    onClick={() => client.deleteBookAssets(book.uuid, true)}
                  >
                    <IconTrash color="red" aria-hidden /> Delete source and
                    cache files
                  </Menu.Item>
                ) : (
                  <Tooltip label="You can't delete source files until the book has been synced successfully">
                    <Text
                      size="sm"
                      display="flex"
                      className="gap-2"
                      opacity={0.5}
                      py="xs"
                      px="sm"
                    >
                      <IconTrash color="red" aria-hidden /> Delete source and
                      cache files
                    </Text>
                  </Tooltip>
                )}
              </Menu.Dropdown>
            </Menu>
          ))}

        {permissions.book_delete && (
          <ActionIcon variant="subtle" color="red" onClick={open}>
            <Tooltip position="right" label="Delete book">
              <IconTrash aria-label="Delete" />
            </Tooltip>
          </ActionIcon>
        )}
      </Stack>
    </>
  )
}
