import { Link } from "expo-router"
import { Platform, Pressable, StyleSheet, View } from "react-native"
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
import { activeBackgroundColor } from "../design"
import {
  ALargeSmall,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Headphones,
  TableOfContents,
} from "lucide-react-native"
import { useColorTheme } from "../hooks/useColorTheme"

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

  const { foreground } = useColorTheme()

  const dispatch = useAppDispatch()

  if (!book) return null

  return (
    <>
      <View style={styles.toolbar}>
        {mode === "text" && (
          <Pressable
            style={[
              styles.toolbarButton,
              styles.settingsButton,
              openDialog === ToolbarDialog.SETTINGS && styles.activeButton,
            ]}
            onPress={() => {
              dispatch(
                toolbarSlice.actions.dialogToggled({
                  dialog: ToolbarDialog.SETTINGS,
                }),
              )
            }}
          >
            <ALargeSmall color={foreground} />
          </Pressable>
        )}

        <Pressable
          style={[
            styles.toolbarButton,
            openDialog === ToolbarDialog.SPEED && styles.activeButton,
          ]}
          onPress={() => {
            dispatch(
              toolbarSlice.actions.dialogToggled({
                dialog: ToolbarDialog.SPEED,
              }),
            )
          }}
        >
          <SpedometerIcon />
        </Pressable>

        <Pressable
          disabled={!currentLocator}
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
          {activeBookmarks.length ? (
            <BookmarkCheck color={foreground} />
          ) : (
            <Bookmark color={foreground} />
          )}
        </Pressable>

        <Pressable
          style={[
            styles.toolbarButton,
            openDialog === ToolbarDialog.TABLE_OF_CONTENTS &&
              styles.activeButton,
          ]}
          onPress={() => {
            dispatch(
              toolbarSlice.actions.dialogToggled({
                dialog: ToolbarDialog.TABLE_OF_CONTENTS,
              }),
            )
          }}
        >
          <TableOfContents color={foreground} />
        </Pressable>
        {mode === "audio" ? (
          <Link
            style={[styles.toolbarButton, styles.bookLink]}
            href={{ pathname: "/book/[id]", params: { id: book.id } }}
          >
            <BookOpen color={foreground} />
          </Link>
        ) : (
          <Link
            style={[styles.toolbarButton, styles.audioLink]}
            href={{ pathname: "/player" }}
          >
            <Headphones color={foreground} />
          </Link>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
  },
  toolbarButton: {
    marginHorizontal: 8,
    padding: 4,
    borderRadius: 4,
  },
  settingsButton: {
    marginHorizontal: 0,
  },
  bookLink: {
    ...(Platform.OS === "ios" && { marginTop: 12 }),
    marginTop: 4,
    padding: 0,
    marginLeft: 0,
  },
  audioLink: {
    marginTop: 4,
    padding: 0,
    marginLeft: 0,
  },
  activeButton: {
    backgroundColor: activeBackgroundColor,
  },
})
