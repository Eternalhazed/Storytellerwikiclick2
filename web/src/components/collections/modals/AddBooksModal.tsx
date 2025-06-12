import { BookGrid } from "@/components/books/BookGrid"
import { useBooks } from "@/components/books/LiveBooksProvider"
import { Search } from "@/components/books/Search"
import { Sort } from "@/components/books/Sort"
import { Collection } from "@/database/collections"
import { useFilterSortedBooks } from "@/hooks/useFilterSortedBooks"
import { UUID } from "@/uuid"
import { Button, Group, Modal, Stack } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"

interface Props {
  collection: Collection
}

export function AddBooksModal({ collection }: Props) {
  const allBooks = useBooks()
  const potentialBooks = allBooks.filter(
    (book) => !book.collections.some((c) => c.uuid === collection.uuid),
  )

  const { books, onFilterChange, filter, sort, onSortChange } =
    useFilterSortedBooks(potentialBooks)

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(() => new Set<UUID>())

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title={`Add books to ${collection.name}`}
        centered
      >
        <Stack>
          <Group>
            <Search value={filter} onValueChange={onFilterChange} />
            <Sort value={sort} onValueChange={onSortChange} />
          </Group>
          <BookGrid
            books={books}
            isSelecting
            selected={selected}
            onSelect={(bookUuid) => {
              setSelected((prev) => {
                const next = new Set(prev)
                if (selected.has(bookUuid)) {
                  next.delete(bookUuid)
                } else {
                  next.add(bookUuid)
                }
                return next
              })
            }}
          />
        </Stack>
      </Modal>
      <Button variant="light" leftSection={<IconPlus />} onClick={() => {}}>
        Add books
      </Button>
    </>
  )
}
