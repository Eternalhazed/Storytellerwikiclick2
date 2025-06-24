import { Collection } from "@/database/collections"
import { Button, ButtonVariant, Menu } from "@mantine/core"
import { IconBooks, IconBookUpload, IconCirclePlus } from "@tabler/icons-react"
import { AddBooksModal } from "./modals/AddBooksModal"
import { useState } from "react"

interface Props {
  className?: string
  variant?: ButtonVariant
  collection?: Collection | undefined
}

export function AddBooksMenu({ className, variant, collection }: Props) {
  const [isAddBooksModalOpen, setIsAddBooksModalOpen] = useState(false)

  if (!collection) {
    return (
      <Button
        {...(className && { className })}
        variant={variant ?? "light"}
        leftSection={<IconBookUpload />}
      >
        Upload books
      </Button>
    )
  }

  return (
    <>
      <AddBooksModal
        isOpen={isAddBooksModalOpen}
        onClose={() => {
          setIsAddBooksModalOpen(false)
        }}
        collection={collection}
      />
      <Menu shadow="sm">
        <Menu.Target>
          <Button
            variant={variant ?? "light"}
            {...(className && { className })}
            leftSection={<IconCirclePlus />}
          >
            Add books
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item leftSection={<IconBookUpload />}>Upload books</Menu.Item>
          <Menu.Item
            leftSection={<IconBooks />}
            onClick={() => {
              setIsAddBooksModalOpen(true)
            }}
          >
            Add from library
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}
