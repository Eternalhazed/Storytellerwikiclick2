import NextImage from "next/image"
import { Stack, Image, Title, Text, Box } from "@mantine/core"
import { useApiClient } from "@/hooks/useApiClient"
import { BookDetail } from "@/apiModels"
import Link from "next/link"

interface Props {
  book: BookDetail
}

export function BookThumbnail({ book }: Props) {
  const client = useApiClient()
  return (
    <Link href={`/books/${book.uuid}`} className="group">
      <Stack gap={2}>
        <Box className="h-[225px] w-[147px]">
          <Image
            className="group-hover:border-st-orange-300 h-full rounded-md group-hover:border-2"
            component={NextImage}
            height={225}
            width={147}
            alt=""
            aria-hidden
            src={client.getCoverUrl(book.uuid)}
          />
        </Box>
        <Title order={3} className="max-w-[147px] text-base">
          {book.title}
        </Title>
        {book.authors[0] && (
          <Text className="max-w-[147px] text-sm">{book.authors[0].name}</Text>
        )}
      </Stack>
    </Link>
  )
}
