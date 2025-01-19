import { View as RNView } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { locateLink } from "../modules/readium"
import { useRef } from "react"
import { useAppSelector, useAppDispatch } from "../store/appState"
import {
  getCurrentlyPlayingBook,
  getLocator,
} from "../store/selectors/bookshelfSelectors"
import { bookshelfSlice } from "../store/slices/bookshelfSlice"
import { isSameChapter } from "../links"
import { Popover, usePopoverContext, View, SizableText, Button } from "tamagui"

export function TableOfContents() {
  const popover = usePopoverContext()
  const ref = useRef<null | ScrollView>(null)
  const currentItemRef = useRef<null | RNView>(null)

  const book = useAppSelector(getCurrentlyPlayingBook)
  const timestampedLocator = useAppSelector(
    (state) => book && getLocator(state, book.id),
  )
  const locator = timestampedLocator?.locator

  const dispatch = useAppDispatch()

  if (!book?.manifest.toc) return

  return (
    <Popover.ScrollView
      ref={ref}
      onLayout={() => {
        if (!ref.current) return
        // @ts-expect-error ScrollView is a perfectly valid component, not sure what
        // exactly the issue is here
        currentItemRef.current?.measureLayout(ref.current, (_x, y) => {
          ref.current?.scrollTo({
            y: y - 40,
            animated: false,
          })
        })
      }}
    >
      {book.manifest.toc.map((item) => (
        <View
          collapsable={false}
          key={item.href}
          {...(isSameChapter(item.href, locator?.href ?? "") && {
            ref: currentItemRef,
          })}
          px="$2"
        >
          <Button
            onPress={async () => {
              const locator = await locateLink(book.id, item)

              popover.onOpenChange(false, "press")
              dispatch(
                bookshelfSlice.actions.navItemTapped({
                  bookId: book.id,
                  locator: { locator, timestamp: Date.now() },
                }),
              )
            }}
            chromeless
            br="$0"
            bbw={1}
            bbc="$borderColor"
            justifyContent="flex-start"
            h="$7"
            bg={
              isSameChapter(item.href, locator?.href ?? "")
                ? "$background"
                : undefined
            }
            noTextWrap
          >
            <SizableText size="$3.5" numberOfLines={2}>
              {item.title}
            </SizableText>
          </Button>
          {item.children?.map((child) => (
            <Button
              key={child.href}
              {...(isSameChapter(child.href, locator?.href ?? "") && {
                ref: currentItemRef,
              })}
              chromeless
              br="$0"
              bbw={1}
              bbc="$borderColor"
              justifyContent="flex-start"
              h="$7"
              pl="$8"
              bg={
                isSameChapter(child.href, locator?.href ?? "")
                  ? "$background"
                  : undefined
              }
              onPress={async () => {
                const locator = await locateLink(book.id, child)

                popover.onOpenChange(false, "press")
                dispatch(
                  bookshelfSlice.actions.navItemTapped({
                    bookId: book.id,
                    locator: { locator, timestamp: Date.now() },
                  }),
                )
              }}
              noTextWrap
            >
              <SizableText size="$3" numberOfLines={2}>
                {child.title}
              </SizableText>
            </Button>
          ))}
        </View>
      ))}
    </Popover.ScrollView>
  )
}
