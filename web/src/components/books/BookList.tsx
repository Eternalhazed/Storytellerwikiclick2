"use client"

import { usePermission } from "@/contexts/UserPermissions"
import { Group, Stack, Text } from "@mantine/core"
import { useFilterSortedBooks } from "@/hooks/useFilterSortedBooks"
import { Search } from "./Search"
import { Sort } from "./Sort"
import { useBooks } from "./LiveBooksProvider"
import { UUID } from "@/uuid"
import { useState } from "react"
import { CollectionToolbar } from "../collections/toolbar/CollectionToolbar"
import { BookGrid } from "./BookGrid"

interface Props {
  collection?: UUID | null
}

export function BookList({ collection }: Props) {
  const canListBooks = usePermission("bookList")

  const liveBooks = useBooks()
  const collectionBooks =
    typeof collection === "string"
      ? liveBooks.filter((book) =>
          book.collections.some((c) => c.uuid === collection),
        )
      : collection === null
        ? liveBooks.filter((book) => book.collections.length === 0)
        : liveBooks
  const { books, onFilterChange, filter, sort, onSortChange } =
    useFilterSortedBooks(collectionBooks)

  const [selected, setSelected] = useState(() => new Set<UUID>())
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      {canListBooks && (
        <Stack>
          <Group>
            <Search value={filter} onValueChange={onFilterChange} />
            <Sort value={sort} onValueChange={onSortChange} />
          </Group>
          <CollectionToolbar
            collection={collection}
            books={books}
            selected={selected}
            setSelected={setSelected}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
          {books.length ? (
            <BookGrid
              books={books}
              isSelecting={isEditing}
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
          ) : collection === null ? (
            <Text>
              There’s nothing here! Congrats on being so well organized!
            </Text>
          ) : (
            <Stack>
              <Text>There’s nothing here!</Text>
            </Stack>
          )}
        </Stack>
      )}
    </>
  )
}
