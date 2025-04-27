import { BookDetail } from "@/apiModels"
import {
  ProcessingTaskType,
  ProcessingTaskStatus,
} from "@/apiModels/models/ProcessingStatus"
import { ProcessingTask } from "@/database/processingTasks"
import { BookEvent } from "@/events"
import { useState, useEffect } from "react"

export function useLiveBooks(initialBooks: BookDetail[] = []) {
  const [books, setBooks] = useState(initialBooks)

  useEffect(() => {
    const eventSource = new EventSource("/api/books/events")

    eventSource.addEventListener("message", (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as BookEvent
      setBooks((books) => {
        if (data.type === "bookCreated") {
          return [data.payload, ...books]
        }

        if (data.type === "bookDeleted") {
          return books.filter((book) => book.uuid !== data.bookUuid)
        }

        const newBooks = books.map((book) => {
          if (book.uuid !== data.bookUuid) return book

          switch (data.type) {
            case "bookUpdated": {
              return { ...book, ...data.payload }
            }
            case "processingQueued": {
              return {
                ...book,
                processingStatus: "queued" as const,
                processingTask: {
                  type: ProcessingTaskType.SPLIT_CHAPTERS,
                  progress: 0,
                  status: ProcessingTaskStatus.STARTED,
                } as ProcessingTask,
              }
            }
            case "processingCompleted": {
              return {
                ...book,
                processingStatus: null,
                processingTask: {
                  type: ProcessingTaskType.SYNC_CHAPTERS,
                  progress: 1,
                  status: ProcessingTaskStatus.COMPLETED,
                } as ProcessingTask,
              }
            }
            case "processingStopped": {
              return {
                ...book,
                processingStatus: null,
                processingTask: {
                  type:
                    book.processingTask?.type ??
                    ProcessingTaskType.SPLIT_CHAPTERS,
                  progress: book.processingTask?.progress ?? 0,
                  status:
                    book.processingTask?.status ?? ProcessingTaskStatus.STARTED,
                } as ProcessingTask,
              }
            }
            case "processingFailed": {
              return {
                ...book,
                processingStatus: null,
                processingTask: {
                  ...book.processingTask,
                  status: ProcessingTaskStatus.IN_ERROR,
                } as ProcessingTask,
              }
            }
            case "processingStarted": {
              return {
                ...book,
                processingStatus: "processing" as const,
                processingTask: {
                  type: ProcessingTaskType.SPLIT_CHAPTERS,
                  progress: 0,
                  status: ProcessingTaskStatus.STARTED,
                } as ProcessingTask,
              }
            }
            case "taskProgressUpdated": {
              return {
                ...book,
                processingStatus: "processing" as const,
                processingTask: {
                  ...book.processingTask,
                  progress: data.payload.progress,
                  status: ProcessingTaskStatus.STARTED,
                } as ProcessingTask,
              }
            }
            case "taskTypeUpdated": {
              return {
                ...book,
                processingStatus: "processing" as const,
                processingTask: {
                  ...book.processingTask,
                  type: data.payload.taskType,
                  status: ProcessingTaskStatus.STARTED,
                } as ProcessingTask,
              }
            }
            default: {
              return book
            }
          }
        })
        return newBooks
      })
    })

    return () => {
      eventSource.close()
    }
  }, [])

  return books
}
