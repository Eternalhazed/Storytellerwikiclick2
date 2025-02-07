import { useAppDispatch, useAppSelector } from "../store/appState"
import { getCurrentlyPlayingBook } from "../store/selectors/bookshelfSelectors"
import { bookshelfSlice } from "../store/slices/bookshelfSlice"
import { highlightTints, highlightUnderlines } from "../colors"
import { useColorTheme } from "../hooks/useColorTheme"
import { Popover, SizableText, Stack, View } from "tamagui"
import { Pressable } from "react-native"

export function Highlights() {
  const book = useAppSelector(getCurrentlyPlayingBook)
  const { dark } = useColorTheme()
  const dispatch = useAppDispatch()

  if (!book) return null

  if (!book.highlights.length) {
    return (
      <Stack p="$12">
        <SizableText color="$gray11">
          No highlights yet! Try adding some by selecting some text and choosing
          a color.
        </SizableText>
      </Stack>
    )
  }

  return (
    <Popover.ScrollView>
      {book.highlights.map((highlight) => (
        <View key={highlight.id} style={{ paddingHorizontal: 8 }}>
          <Pressable
            onPress={async () => {
              dispatch(
                bookshelfSlice.actions.bookmarkTapped({
                  bookId: book.id,
                  bookmark: {
                    locator: highlight.locator,
                    timestamp: Date.now(),
                  },
                }),
              )
            }}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#CCC",
              paddingVertical: 16,
              paddingHorizontal: 16,
            }}
          >
            <SizableText size="$3.5">{highlight.locator.title}</SizableText>
            {highlight.locator.locations?.position && (
              <SizableText size="$3" my="$2">
                Page {highlight.locator.locations.position}
              </SizableText>
            )}
            {highlight.locator.text?.highlight && (
              <>
                <SizableText
                  size="$3"
                  fontFamily="$book"
                  fontSize={14}
                  textAlign="justify"
                  lineHeight={14 * 1.4}
                  textDecorationLine="underline"
                  textDecorationStyle="solid"
                  textDecorationColor={
                    highlightUnderlines[dark ? "dark" : "light"][highlight.color]
                  }
                  bg={highlightTints[dark ? "dark" : "light"][highlight.color]}
                >
                  {highlight.locator.text.highlight}
                </SizableText>
                {highlight.note && (
                  <SizableText
                    size="$3"
                    fontFamily="$book"
                    fontSize={13}
                    textAlign="justify"
                    lineHeight={13 * 1.4}
                    color="$gray11"
                    mt="$2"
                    ml="$2"
                  >
                    {highlight.note}
                  </SizableText>
                )}
              </>
            )}
          </Pressable>
        </View>
      ))}
    </Popover.ScrollView>
  )
}
