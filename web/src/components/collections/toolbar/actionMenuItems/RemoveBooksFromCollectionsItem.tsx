import { useBooks } from "@/components/books/LiveBooksProvider"
import { Collection } from "@/database/collections"
import { useApiClient } from "@/hooks/useApiClient"
import { UUID } from "@/uuid"
import { Button, MenuItem, Modal, MultiSelect } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconBooks } from "@tabler/icons-react"
import { useMemo, useState } from "react"

interface Props {
  selected: Set<UUID>
}

export function RemoveBooksFromCollectionsItem({ selected }: Props) {
  const client = useApiClient()

  const books = useBooks()
  const collections = useMemo(
    () =>
      Array.from(
        books
          .reduce((acc, book) => {
            book.collections.forEach((collection) => {
              acc.set(collection.uuid, collection)
            })
            return acc
          }, new Map<UUID, Collection>())
          .values(),
      ),
    [books],
  )

  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm({
    initialValues: {
      collections: [] as UUID[],
    },
  })

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title="Remove books from collections"
        centered
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(async (values) => {
            setIsSaving(true)
            await client.deleteBooksFromCollections(
              values.collections,
              Array.from(selected),
            )

            setIsSaving(false)
            setIsOpen(false)
          })}
        >
          <MultiSelect
            label="Collections"
            placeholder="Remove from collections"
            data={collections.map((collection) => ({
              label: collection.name,
              value: collection.uuid,
            }))}
            {...form.getInputProps("collections")}
          />
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </form>
      </Modal>
      <MenuItem
        leftSection={<IconBooks size={14} className="text-red-600" />}
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Remove from collections
      </MenuItem>
    </>
  )
}
