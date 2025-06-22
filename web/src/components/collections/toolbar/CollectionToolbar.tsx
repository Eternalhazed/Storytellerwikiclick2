import { BookDetail } from "@/apiModels"
import { UUID } from "@/uuid"
import { Group, Button } from "@mantine/core"
import { IconEditOff, IconEdit } from "@tabler/icons-react"
import { SetStateAction } from "react"
import { SelectMenu } from "./SelectMenu"
import { ActionMenu } from "./ActionMenu"
import { Collection } from "@/database/collections"
import { AddBooksModal } from "../modals/AddBooksModal"

interface Props {
  collection?: Collection | undefined
  books: BookDetail[]
  selected: Set<UUID>
  setSelected: (action: SetStateAction<Set<UUID>>) => void
  isEditing: boolean
  setIsEditing: (action: SetStateAction<boolean>) => void
}

export function CollectionToolbar({
  collection,
  books,
  selected,
  setSelected,
  isEditing,
  setIsEditing,
}: Props) {
  return (
    <Group>
      <Button
        variant="light"
        className="self-start"
        leftSection={isEditing ? <IconEditOff /> : <IconEdit />}
        onClick={() => {
          setIsEditing((value) => !value)
        }}
      >
        {isEditing ? "Done" : "Edit"}
      </Button>
      {isEditing && (
        <>
          <SelectMenu books={books} setSelected={setSelected} />
          <ActionMenu selected={selected} />
        </>
      )}
      {collection && <AddBooksModal collection={collection} />}
    </Group>
  )
}
