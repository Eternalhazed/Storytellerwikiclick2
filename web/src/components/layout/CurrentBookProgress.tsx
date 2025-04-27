import NextImage from "next/image"
import { Group, Image, RingProgress, Stack, Text, Title } from "@mantine/core"
import { ProcessingTaskTypes } from "../books/BookStatus"
import { useBooks } from "../books/LiveBooksProvider"
import { useApiClient } from "@/hooks/useApiClient"

export function CurrentBookProgress() {
  const client = useApiClient()
  const books = useBooks()

  const currentBook = books.find(
    (book) => book.processingStatus === "processing",
  )

  if (!currentBook) return null

  const userFriendlyTaskType =
    currentBook.processingTask &&
    ProcessingTaskTypes[
      currentBook.processingTask.type as keyof typeof ProcessingTaskTypes
    ]

  return (
    <Group bg="st-orange" wrap="nowrap">
      <Image
        component={NextImage}
        h={150}
        w={98}
        height={150}
        width={98}
        alt=""
        aria-hidden
        src={client.getCoverUrl(currentBook.uuid)}
      />
      <Stack className="my-4 self-stretch" justify="space-between">
        <Title order={3} size="lg">
          {currentBook.title}
        </Title>
        <Group>
          <RingProgress
            size={40}
            thickness={4}
            roundCaps
            rootColor="gray"
            sections={[
              {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                value: currentBook.processingTask!.progress * 100,
                color: "white",
              },
            ]}
          />
          <Text>{userFriendlyTaskType}</Text>
        </Group>
      </Stack>
    </Group>
  )
}
