import { Collection } from "@/database/collections"
import { Modal } from "@mantine/core"
import { useForm } from "@mantine/form"

interface Props {
  isOpen: boolean
  onClose: () => void
  collection?: Collection | undefined
}

export function UploadBooksModal({ isOpen, onClose, collection }: Props) {
  const form = useForm({
    initialValues: {
      epubFile: null as File | null,
      audioFiles: null as File[] | null,
      collections: collection ? [collection.uuid] : [],
    },
  })

  return (
    <Modal
      opened={isOpen}
      onClose={() => {
        form.reset()
        onClose()
      }}
      title="Upload book"
      centered
      size="xl"
    ></Modal>
  )
}
