import { User } from "@/apiModels"
import { CollectionsInput } from "@/components/books/edit/CollectionsInput"
import { useCurrentUser } from "@/contexts/UserPermissions"
import { Collection } from "@/database/collections"
import { useApiClient } from "@/hooks/useApiClient"
import { UUID } from "@/uuid"
import { Button, MenuItem, Modal } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconBooks } from "@tabler/icons-react"
import { useState } from "react"

interface Props {
  selected: Set<UUID>
}

export function AddBooksToCollectionsItem({ selected }: Props) {
  const client = useApiClient()
  const currentUser = useCurrentUser()

  const [users, setUsers] = useState<User[]>([])
  const [collections, setCollections] = useState<Collection[]>([])

  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm({
    initialValues: {
      collections: [] as UUID[],
    },
  })

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title="Add books to collections"
        centered
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(async (values) => {
            setIsSaving(true)
            await client.addBooksToCollections(
              values.collections,
              Array.from(selected),
            )

            setIsSaving(false)
            setIsOpen(false)
          })}
        >
          <CollectionsInput
            getInputProps={form.getInputProps}
            collections={collections}
            values={form.values.collections}
            users={users}
            onCollectionAdd={async (values) => {
              if (
                !values.public &&
                currentUser &&
                !values.users.includes(currentUser.id)
              ) {
                values.users.push(currentUser.id)
              }
              const newCollection = await client.createCollection(values)
              setCollections((collections) => [...collections, newCollection])
            }}
          />
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </form>
      </Modal>
      <MenuItem
        leftSection={<IconBooks size={14} />}
        onClick={async () => {
          setIsOpen(true)
          const [collections, users] = await Promise.all([
            client.listCollections(),
            client.listUsers(),
          ])
          setCollections(collections)
          setUsers(users)
        }}
      >
        Add to collection
      </MenuItem>
    </>
  )
}
