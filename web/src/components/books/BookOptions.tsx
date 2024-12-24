import { BookDetail } from "@/apiModels"
import { useApiClient } from "@/hooks/useApiClient"
import { useRouter } from "next/navigation"
import { usePermissions } from "@/contexts/UserPermissions"
import { ProcessingItems } from "./ProcessingItems"
import { ActionIcon, Stack, Tooltip } from "@mantine/core"
import { IconPencil, IconTrash } from "@tabler/icons-react"

type Props = {
  book: BookDetail
  synchronized: boolean
}

export function BookOptions({ book, synchronized }: Props) {
  const client = useApiClient()
  const router = useRouter()

  const permissions = usePermissions()

  return (
    <Stack>
      {permissions.book_update && (
        <ActionIcon
          variant="subtle"
          color="black"
          onClick={() => {
            router.push(`/books/${book.uuid}`)
          }}
        >
          <Tooltip position="right" label="Edit">
            <IconPencil aria-label="Edit" />
          </Tooltip>
        </ActionIcon>
      )}
      {permissions.book_process &&
        book.processing_status &&
        book.original_files_exist && (
          <ProcessingItems synchronized={synchronized} book={book} />
        )}
      {permissions.book_delete && (
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => {
            void client.deleteBook(book.uuid)
          }}
        >
          <Tooltip position="right" label="Delete book">
            <IconTrash aria-label="Delete" />
          </Tooltip>{" "}
        </ActionIcon>
      )}
    </Stack>
  )
}
