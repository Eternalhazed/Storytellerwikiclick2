import { UUID } from "@/uuid"
import { Menu, MenuTarget, Button, MenuDropdown, MenuItem } from "@mantine/core"
import {
  IconCheckbox,
  IconChevronDown,
  IconBook,
  IconBookOff,
} from "@tabler/icons-react"
import { AddBooksToCollectionsItem } from "./actionMenuItems/AddBooksToCollectionsItem"
import { RemoveBooksFromCollectionsItem } from "./actionMenuItems/RemoveBooksFromCollectionsItem"

interface Props {
  selected: Set<UUID>
}

export function ActionMenu({ selected }: Props) {
  const disabled = selected.size === 0

  return (
    <>
      <Menu shadow="sm" disabled={disabled} keepMounted>
        <MenuTarget>
          <Button
            variant="light"
            leftSection={<IconCheckbox />}
            rightSection={<IconChevronDown size={16} />}
            disabled={disabled}
          >
            Actions
          </Button>
        </MenuTarget>

        <MenuDropdown>
          <AddBooksToCollectionsItem selected={selected} />
          <RemoveBooksFromCollectionsItem selected={selected} />
          <MenuItem leftSection={<IconBook size={14} />} onClick={() => {}}>
            Add to series
          </MenuItem>
          <MenuItem
            leftSection={<IconBookOff size={14} className="text-red-600" />}
            onClick={() => {}}
          >
            Remove from series
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </>
  )
}
