import { createAuthedApiClient } from "@/authedApiClient"
import { BookEditForm } from "./BookEditForm"
import { UUID } from "@/uuid"

interface Props {
  bookUuid: UUID
}

export async function BookEdit({ bookUuid }: Props) {
  const client = await createAuthedApiClient()
  const statuses = await client.getStatuses()
  const authors = await client.getAuthors()
  const series = await client.getSeries()

  return (
    <BookEditForm
      bookUuid={bookUuid}
      statuses={statuses}
      authors={authors}
      series={series}
    />
  )
}
