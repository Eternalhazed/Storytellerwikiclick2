import { Reader } from "@/components/reader/Reader"
import { UUID } from "@/uuid"
import "./globals.css"

type Props = {
  params: {
    uuid: UUID
  }
}

export default function ReaderPage({ params: { uuid } }: Props) {
  return <Reader uuid={uuid} />
}
