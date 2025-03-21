import { BookDetail } from "@/apiModels"
import { usePermissions } from "@/contexts/UserPermissions"
import { ProcessingItems } from "./ProcessingItems"
import { ActionIcon, Modal, Stack, Tooltip } from "@mantine/core"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import NextLink from "next/link"
import { useDisclosure } from "@mantine/hooks"

type Props = {
  book: BookDetail
  synchronized: boolean
  showTTS: boolean
}

export function BookOptions({ book, synchronized, showTTS }: Props) {
  const [opened, { open, close }] = useDisclosure()

  const permissions = usePermissions()

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Deleting book"
        centered
        size="sm"
      >
        {/* ... existing code ... */}
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
        {permissions.book_process &&
          book.processing_status &&
          (book.original_files_exist || showTTS) && (
            <ProcessingItems
              synchronized={synchronized}
              book={book}
              showTTS={showTTS}
            />
          )}
        {permissions.book_delete && (
          <ActionIcon variant="subtle" color="red" onClick={open}>
            <Tooltip position="right" label="Delete book">
              <IconTrash aria-label="Delete" />
            </Tooltip>{" "}
          </ActionIcon>
        )}
      </Stack>
    </>
  )
}
