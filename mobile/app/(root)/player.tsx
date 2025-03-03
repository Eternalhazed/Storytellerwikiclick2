import { Link, router } from "expo-router"
import { useWindowDimensions } from "react-native"
import { useAppDispatch, useAppSelector } from "../../store/appState"
import { useEffect, useMemo, useState } from "react"
import TrackPlayer from "react-native-track-player"
import {
  ChevronDown,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "@tamagui/lucide-icons"
import { useAudioBook } from "../../hooks/useAudioBook"
import {
  getCurrentlyPlayingBook,
  getLocator,
} from "../../store/selectors/bookshelfSelectors"
import { areLocatorsEqual } from "../../modules/readium"
import { isSameChapter } from "../../links"
import {
  Button,
  H2,
  Image,
  PortalProvider,
  SizableText,
  Slider,
  Text,
  useTheme,
  XStack,
  YStack,
  ScrollView,
} from "tamagui"
import { Toolbar } from "../../components/Toolbar"
import { LoadingView } from "../../components/LoadingView"
import { getLocalAudioBookCoverUrl } from "../../store/persistence/files"
import { JumpBackwardFifteenIcon } from "../../icons/JumpBackwardFifteenIcon"
import { JumpForwardFifteenIcon } from "../../icons/JumpForwardFifteenIcon"
import {
  nextTrackPressed,
  playerPositionSeeked,
  prevTrackPressed,
} from "../../store/slices/bookshelfSlice"

export default function PlayerScreen() {
  const { color } = useTheme()
  const dimensions = useWindowDimensions()
  const book = useAppSelector(getCurrentlyPlayingBook)
  const timestampedLocator = useAppSelector(
    (state) => book && getLocator(state, book.id),
  )
  const locator = timestampedLocator?.locator
  const activeBookmarks = useMemo(
    () =>
      locator && book
        ? book.bookmarks.filter((bookmark) =>
            areLocatorsEqual(bookmark, locator),
          )
        : [],
    [book, locator],
  )
  const dispatch = useAppDispatch()

  const { isLoading, isPlaying, remainingTime, track, total } = useAudioBook()

  const [eagerProgress, setEagerProgress] = useState(track.position)

  const progressTime = useMemo(() => {
    const relativeProgress = eagerProgress - track.startPosition
    const minutes = Math.floor(relativeProgress / 60)
    const seconds = Math.floor(relativeProgress - minutes * 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }, [eagerProgress, track.startPosition])

  const remainingProgressTime = useMemo(() => {
    const remainingProgress = track.endPosition - eagerProgress
    const minutes = Math.floor(remainingProgress / 60)
    const seconds = Math.floor(remainingProgress - minutes * 60)
      .toString()
      .padStart(2, "0")
    return `-${minutes}:${seconds}`
  }, [track.endPosition, eagerProgress])

  useEffect(() => {
    setEagerProgress(track.position)
  }, [track.position])

  const isPresented = router.canGoBack()

  if (!book) return null

  const title = book.manifest.toc?.find((link) =>
    isSameChapter(link.href, locator?.href ?? ""),
  )?.title

  return (
    <PortalProvider shouldAddRootHost>
      <YStack paddingHorizontal={24}>
        <XStack justifyContent="space-between" marginVertical="$2">
          {isPresented ? (
            <Button
              size="$4"
              marginLeft={-8}
              circular
              chromeless
              onPress={() => {
                router.back()
              }}
            >
              <ChevronDown size="$3" />
            </Button>
          ) : (
            <Link href="/">
              <ChevronDown />
            </Link>
          )}
          <Toolbar mode="audio" activeBookmarks={activeBookmarks} />
        </XStack>

        <ScrollView contentContainerStyle={{ alignItems: "center" }} px="$1">
          {isLoading && <LoadingView />}
          <Image
            aspectRatio={1}
            borderRadius="$1"
            source={{
              uri: getLocalAudioBookCoverUrl(book.id),
              width: Math.min(
                dimensions.width - 24 * 2,
                dimensions.height * 0.45,
              ),
              height: Math.min(
                dimensions.width - 24 * 2,
                dimensions.height * 0.45,
              ),
            }}
          />
          <H2 size="$3" my="$3" alignSelf="flex-start" numberOfLines={2}>
            {book.title}
          </H2>
          <SizableText
            size="$3.5"
            mb="$6"
            alignSelf="flex-start"
            numberOfLines={1}
          >
            {title}
          </SizableText>
          <SizableText size="$3.5" mb="$3">
            Track {track.index + 1} of {total.trackCount}
          </SizableText>
          {/* TODO: Use local state and a use effect to make this more responsive */}
          <Slider
            value={[eagerProgress]}
            min={track.startPosition}
            // For some reason, when the player is being opened,
            // the result of useProgress gets zeroed out for one
            // render. This results in setting min and max both
            // to zero, which positions the thumb at NaN, which
            // crashes the app. So we set the max to 1 if it was
            // 0, to prevent this edge case.
            max={track.endPosition || 1}
            step={1}
            alignSelf="stretch"
            onValueChange={([newProgress]) => {
              setEagerProgress(newProgress ?? 0)
              dispatch(playerPositionSeeked({ progress: newProgress ?? 0 }))
            }}
          >
            <Slider.Track backgroundColor="$backgroundStrong">
              <Slider.TrackActive backgroundColor="$brandColor" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              size="$2"
              hitSlop={20}
              borderColor="$brand6"
              backgroundColor="$brandColor"
              circular
            />
          </Slider>
          <XStack
            mt="$2"
            mb="$3"
            alignSelf="stretch"
            justifyContent="space-between"
          >
            <Text>{progressTime}</Text>
            <Text>{remainingTime}</Text>
            <Text>{remainingProgressTime}</Text>
          </XStack>
          <XStack
            alignSelf="stretch"
            alignItems="center"
            justifyContent="space-around"
          >
            <Button
              circular
              chromeless
              size="$6"
              onPress={() => {
                dispatch(prevTrackPressed())
              }}
            >
              <SkipBack />
            </Button>
            <Button
              circular
              chromeless
              size="$6"
              onPress={async () => {
                const { position: currentPosition } =
                  await TrackPlayer.getProgress()
                dispatch(
                  playerPositionSeeked({ progress: currentPosition - 15 }),
                )
              }}
            >
              <JumpBackwardFifteenIcon />
            </Button>
            <Button
              circular
              chromeless
              size="$8"
              onPress={
                isPlaying
                  ? () => {
                      TrackPlayer.pause()
                    }
                  : () => {
                      TrackPlayer.play()
                    }
              }
            >
              {isPlaying ? (
                <Pause size="$6" fill={color.val} stroke={color.val} />
              ) : (
                <Play size="$6" fill={color.val} stroke={color.val} />
              )}
            </Button>
            <Button
              circular
              chromeless
              size="$6"
              onPress={async () => {
                const { position: currentPosition } =
                  await TrackPlayer.getProgress()
                dispatch(
                  playerPositionSeeked({ progress: currentPosition + 15 }),
                )
              }}
            >
              <JumpForwardFifteenIcon />
            </Button>
            <Button
              circular
              chromeless
              size="$6"
              onPress={() => {
                dispatch(nextTrackPressed())
              }}
            >
              <SkipForward />
            </Button>
          </XStack>
        </ScrollView>
      </YStack>
    </PortalProvider>
  )
}
