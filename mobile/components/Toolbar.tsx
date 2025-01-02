import { useRouter } from "expo-router"
import { SpedometerIcon } from "../icons/SpedometerIcon"
import { useAppDispatch, useAppSelector } from "../store/appState"
import {
  getCurrentlyPlayingBook,
  getLocator,
} from "../store/selectors/bookshelfSelectors"
import { ToolbarDialog, toolbarSlice } from "../store/slices/toolbarSlice"
import { bookshelfSlice } from "../store/slices/bookshelfSlice"
import { ReadiumLocator } from "../modules/readium/src/Readium.types"
import { getOpenDialog } from "../store/selectors/toolbarSelectors"
import { Button, XStack } from "tamagui"
import {
  ALargeSmall,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  CirclePlay,
  ListOrdered,
} from "@tamagui/lucide-icons"

type Props = {
  mode: "audio" | "text"
  activeBookmarks: ReadiumLocator[]
}

export function Toolbar({ mode, activeBookmarks }: Props) {
  const book = useAppSelector(getCurrentlyPlayingBook)
  const currentLocator = useAppSelector(
    (state) => book && getLocator(state, book.id),
  )
  const openDialog = useAppSelector(getOpenDialog)
  const router = useRouter()

  const dispatch = useAppDispatch()

  if (!book) return null

  return (
    <XStack>
      {mode === "text" && (
        <Button
          size="$4"
          circular
          chromeless={openDialog !== ToolbarDialog.SETTINGS}
          onPress={() => {
            dispatch(
              toolbarSlice.actions.dialogToggled({
                dialog: ToolbarDialog.SETTINGS,
              }),
            )
          }}
        >
          <ALargeSmall />
        </Button>
      )}

      <Button
        size="$4"
        circular
        icon={SpedometerIcon}
        chromeless={openDialog !== ToolbarDialog.SPEED}
        onPress={() => {
          dispatch(
            toolbarSlice.actions.dialogToggled({ dialog: ToolbarDialog.SPEED }),
          )
        }}
      />

      <Button
        size="$4"
        circular
        disabled={!currentLocator}
        chromeless
        onPress={() => {
          if (activeBookmarks.length) {
            dispatch(
              bookshelfSlice.actions.bookmarksRemoved({
                bookId: book.id,
                locators: activeBookmarks,
              }),
            )
          } else if (currentLocator) {
            dispatch(
              bookshelfSlice.actions.bookmarkAdded({
                bookId: book.id,
                locator: currentLocator.locator,
              }),
            )
          }
        }}
      >
        {activeBookmarks.length ? <BookmarkCheck /> : <Bookmark />}
      </Button>

      <Button
        size="$4"
        circular
        chromeless={openDialog !== ToolbarDialog.TABLE_OF_CONTENTS}
        onPress={() => {
          dispatch(
            toolbarSlice.actions.dialogToggled({
              dialog: ToolbarDialog.TABLE_OF_CONTENTS,
            }),
          )
        }}
      >
        <ListOrdered />
      </Button>

      {mode === "audio" ? (
        <Button
          size="$4"
          circular
          chromeless
          onPress={() => {
            router.replace({ pathname: "/book/[id]", params: { id: book.id } })
          }}
        >
          <BookOpen />
        </Button>
      ) : (
        <Button
          size="$4"
          circular
          chromeless
          onPress={() => {
            router.push({ pathname: "/player" })
          }}
        >
          <CirclePlay />
        </Button>
      )}
    </XStack>
  )
}
