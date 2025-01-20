import { useRouter } from "expo-router"
import { SpedometerIcon } from "../icons/SpedometerIcon"
import { useAppDispatch, useAppSelector } from "../store/appState"
import {
  getCurrentlyPlayingBook,
  getLocator,
} from "../store/selectors/bookshelfSelectors"
import { bookshelfSlice } from "../store/slices/bookshelfSlice"
import { ReadiumLocator } from "../modules/readium/src/Readium.types"
import {
  Adapt,
  Button,
  Popover,
  SizableText,
  Slider,
  Tabs,
  Text,
  XStack,
  YStack,
} from "tamagui"
import {
  ALargeSmall,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  TableOfContents as ToC,
  MinusCircle,
  PlusCircle,
  Headphones,
} from "@tamagui/lucide-icons"
import { ReadingSettings } from "./ReadingSettings"
import { useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useColorTheme } from "../hooks/useColorTheme"
import { getBookPlayerSpeed } from "../store/selectors/preferencesSelectors"
import { preferencesSlice } from "../store/slices/preferencesSlice"
import { TableOfContents } from "./TableOfContents"
import { Bookmarks } from "./Bookmarks"
import { Highlights } from "./Highlights"

type Props = {
  mode: "audio" | "text"
  activeBookmarks: ReadiumLocator[]
}

export function Toolbar({ mode, activeBookmarks }: Props) {
  const { background } = useColorTheme()
  const book = useAppSelector(getCurrentlyPlayingBook)
  const currentLocator = useAppSelector(
    (state) => book && getLocator(state, book.id),
  )
  const currentSpeed = useAppSelector(
    (state) => book && getBookPlayerSpeed(state, book.id),
  )

  const insets = useSafeAreaInsets()

  const dimensions = useWindowDimensions()

  const router = useRouter()

  const dispatch = useAppDispatch()

  if (!book) return null

  return (
    <XStack>
      {mode === "text" && (
        <Popover>
          <Popover.Trigger asChild>
            <Button size="$4" px="$1" chromeless>
              <ALargeSmall />
            </Button>
          </Popover.Trigger>
          <Adapt platform="touch">
            <Popover.Sheet
              modal
              dismissOnSnapToBottom
              snapPoints={[50, 30]}
              dismissOnOverlayPress={false}
            >
              <Popover.Sheet.Overlay
                unstyled
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
              />
              <Popover.Sheet.Handle backgroundColor="$color9" />
              <Popover.Sheet.Frame
                padding="$4"
                elevation={3}
                borderColor="$borderColor"
                borderWidth={1}
              >
                <Adapt.Contents />
              </Popover.Sheet.Frame>
            </Popover.Sheet>
          </Adapt>
          <Popover.Content
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
          >
            <Popover.Close asChild>
              <Button size="$4" chromeless alignSelf="flex-end">
                Done
              </Button>
            </Popover.Close>
            <Popover.Sheet.ScrollView
              style={{
                height: dimensions.height / 2 - insets.top,
                backgroundColor: background,
              }}
            >
              <ReadingSettings bookId={book.id} />
            </Popover.Sheet.ScrollView>
          </Popover.Content>
        </Popover>
      )}

      <Popover>
        <Popover.Trigger asChild>
          <Button w="$5" px="$1" chromeless noTextWrap>
            {currentSpeed === 1 ? (
              <SpedometerIcon />
            ) : (
              <SizableText size="$3">{currentSpeed}x</SizableText>
            )}
          </Button>
        </Popover.Trigger>
        <Popover.Content
          mt={mode === "audio" ? -50 : 0}
          padding="$2"
          width={dimensions.width - 100}
          elevation={3}
          borderColor="$borderColor"
          borderWidth={1}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <YStack alignItems="center" gap={8} width="100%">
            <Text>Playback speed</Text>
            <Text>{currentSpeed}x</Text>

            <XStack gap={16} alignItems="center">
              <Button
                size="$1"
                chromeless
                circular
                onPress={() => {
                  dispatch(
                    preferencesSlice.actions.playerSpeedChanged({
                      bookId: book.id,
                      speed: Math.round(((currentSpeed ?? 1) - 0.1) * 10) / 10,
                    }),
                  )
                }}
              >
                <MinusCircle size="$2" />
              </Button>
              <Slider
                value={[currentSpeed ?? 1]}
                step={0.1}
                min={0.5}
                max={4.0}
                flexGrow={1}
                onValueChange={([newValue]) => {
                  dispatch(
                    preferencesSlice.actions.playerSpeedChanged({
                      bookId: book.id,
                      speed: newValue!,
                    }),
                  )
                }}
              >
                <Slider.Track>
                  <Slider.TrackActive />
                </Slider.Track>
                <Slider.Thumb index={0} size="$1" circular />
              </Slider>
              <Button
                size="$1"
                chromeless
                circular
                onPress={() => {
                  dispatch(
                    preferencesSlice.actions.playerSpeedChanged({
                      bookId: book.id,
                      speed: Math.round(((currentSpeed ?? 1) + 0.1) * 10) / 10,
                    }),
                  )
                }}
              >
                <PlusCircle size="$2" />
              </Button>
            </XStack>
            <XStack gap={8} margin={8}>
              {[0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                <Button
                  key={speed}
                  circular
                  size="$4"
                  onPress={() => {
                    dispatch(
                      preferencesSlice.actions.playerSpeedChanged({
                        bookId: book.id,
                        speed,
                      }),
                    )
                  }}
                >
                  <SizableText size="$2">{speed}</SizableText>
                </Button>
              ))}
            </XStack>
          </YStack>
        </Popover.Content>
      </Popover>

      <Button
        size="$4"
        px="$1"
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
            // TODO: Try to get the title of the bookmark
            // from the chapter, if it's not set in the locator
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

      <Popover>
        <Popover.Trigger asChild>
          <Button size="$4" px="$1" chromeless>
            {/* <ListOrdered /> */}
            <ToC />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          mt={mode === "audio" ? -50 : 0}
          py="0"
          px="$2"
          width={dimensions.width - 50}
          height={dimensions.height - 250}
          elevation={3}
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Tabs
            defaultValue="contents"
            orientation="horizontal"
            flexDirection="column"
            height={dimensions.height - 300}
          >
            <Tabs.List bbw={1} bbc="$gray8" bblr="$0" bbrr="$0">
              <Tabs.Tab value="contents" h="$6" bblr="$0">
                <SizableText>Contents</SizableText>
              </Tabs.Tab>
              <Tabs.Tab value="bookmarks" h="$6">
                <SizableText>Bookmarks</SizableText>
              </Tabs.Tab>
              <Tabs.Tab value="highlights" h="$6" bbrr="$0">
                <SizableText>Highlights</SizableText>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Content value="contents">
              <TableOfContents />
            </Tabs.Content>
            <Tabs.Content value="bookmarks">
              <Bookmarks />
            </Tabs.Content>
            <Tabs.Content value="highlights">
              <Highlights />
            </Tabs.Content>
          </Tabs>
        </Popover.Content>
      </Popover>

      {mode === "audio" ? (
        <Button
          size="$4"
          px="$1"
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
          px="$1"
          chromeless
          onPress={() => {
            router.push({ pathname: "/player" })
          }}
        >
          <Headphones />
        </Button>
      )}
    </XStack>
  )
}
