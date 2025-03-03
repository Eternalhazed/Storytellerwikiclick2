import { useAppDispatch, useAppSelector } from "../store/appState"
import { getCurrentlyPlayingBook } from "../store/selectors/bookshelfSelectors"
import { bookshelfSlice } from "../store/slices/bookshelfSlice"
import { Button, Popover, SizableText, Stack, View } from "tamagui"

export function Bookmarks() {
  const book = useAppSelector(getCurrentlyPlayingBook)
  const dispatch = useAppDispatch()

  if (!book) return null

  if (!book.bookmarks.length) {
    return (
      <Stack p="$12">
        <SizableText color="$gray11">
          No bookmarks yet! Try adding some by pressing the bookmark icon in the
          toolbar.
        </SizableText>
      </Stack>
    )
  }

  return (
    <Popover.ScrollView>
      {book.bookmarks.map((bookmark) => (
        <View key={JSON.stringify(bookmark)} px="$2">
          <Button
            onPress={async () => {
              dispatch(
                bookshelfSlice.actions.bookmarkTapped({
                  bookId: book.id,
                  bookmark: { locator: bookmark, timestamp: Date.now() },
                }),
              )
            }}
            chromeless
            br="$0"
            bbw={1}
            bbc="$borderColor"
            alignItems="flex-start"
            fd="column"
            h="$8"
            noTextWrap
          >
            <SizableText size="$3.5" numberOfLines={2}>
              {bookmark.title}
            </SizableText>
            {bookmark.locations?.position && (
              <SizableText size="$3" alignSelf="flex-end">
                Page {bookmark.locations?.position}
              </SizableText>
            )}
          </Button>
        </View>
      ))}
    </Popover.ScrollView>
  )
}
