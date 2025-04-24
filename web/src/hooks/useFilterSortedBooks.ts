import { BookDetail } from "@/apiModels"
import { useMemo, useState } from "react"
import Fuse from "fuse.js"

export type BookSortKey = "title" | "author" | "align-time" | "create-time"
export type SortDirection = "asc" | "desc"
export type BookSort = [BookSortKey, SortDirection]

export function useFilterSortedBooks(books: BookDetail[]) {
  const fuse = useMemo(
    () =>
      new Fuse(books, {
        findAllMatches: true,
        ignoreDiacritics: true,
        keys: ["title", "authors.name"],
      }),
    [books],
  )
  const [search, setSearch] = useState("")
  const filtered = useMemo(
    () => (search === "" ? books : fuse.search(search).map((f) => f.item)),
    [books, fuse, search],
  )

  const [sort, setSort] = useState<BookSort>(["title", "asc"])
  const sorted = useMemo(
    () =>
      filtered.toSorted((a, b) => {
        const first = sort[1] === "asc" ? a : b
        const second = sort[1] === "asc" ? b : a
        switch (sort[0]) {
          case "title": {
            return first.title.toLowerCase() > second.title.toLowerCase()
              ? 1
              : first.title.toLowerCase() < second.title.toLowerCase()
                ? -1
                : 0
          }
          case "author": {
            const firstAuthor = first.authors[0]
            if (!firstAuthor) return -1
            const secondAuthor = second.authors[0]
            if (!secondAuthor) return 1
            return firstAuthor.name.toLowerCase() >
              secondAuthor.name.toLowerCase()
              ? 1
              : firstAuthor.name.toLowerCase() < secondAuthor.name.toLowerCase()
                ? -1
                : 0
          }
        }
        return 0
      }),
    [filtered, sort],
  )

  return {
    books: sorted,
    onFilterChange: setSearch,
    filter: search,
    sort,
    onSortChange: setSort,
  }
}
