"use client"

import { BookDetail } from "@/apiModels"
import { BookStatus } from "./BookStatus"
import styles from "./books.module.css"
import { AddBookForm } from "./AddBookForm"
import { usePermission } from "@/contexts/UserPermissions"
import { useLiveBooks } from "@/hooks/useLiveBooks"

type Props = {
  books: BookDetail[]
}

export function BookList({ books: initialBooks }: Props) {
  const canListBooks = usePermission("book_list")
  const books = useLiveBooks(initialBooks)

  return (
    <>
      <AddBookForm />
      {canListBooks && (
        <ul className={styles["book-list"]}>
          {books.map((book) => (
            <li key={book.uuid} className={styles["book-status"]}>
              <BookStatus book={book} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
