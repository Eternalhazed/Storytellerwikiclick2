import { List, Checkbox } from "@mantine/core"
import { BookThumbnail } from "./BookThumbnail"
import { BookDetail } from "@/apiModels"
import { UUID } from "@/uuid"

interface Props {
  books: BookDetail[]
  isSelecting: boolean
  selected: Set<UUID>
  onSelect: (book: UUID) => void
}

export function BookGrid({ books, isSelecting, selected, onSelect }: Props) {
  return (
    <List listStyleType="none" className="flex flex-row flex-wrap gap-8">
      {books.map((book) => (
        <List.Item
          key={book.uuid}
          className="relative my-8"
          classNames={{ itemWrapper: "block" }}
        >
          {isSelecting && (
            <Checkbox
              className="absolute left-1 top-1 z-50"
              checked={selected.has(book.uuid)}
              onChange={() => {
                onSelect(book.uuid)
              }}
            />
          )}
          <BookThumbnail
            book={book}
            link={!isSelecting}
            onClick={() => {
              onSelect(book.uuid)
            }}
          />
        </List.Item>
      ))}
    </List>
  )
}
