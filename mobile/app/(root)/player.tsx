import { Link, router } from "expo-router"
import { useWindowDimensions } from "react-native"
import { useAppSelector } from "../../store/appState"
import { useEffect, useMemo, useState } from "react"
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
} from "react-native-track-player"
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
  H3,
  Image,
  Slider,
  Text,
  useTheme,
  XStack,
  YStack,
} from "tamagui"
import { Toolbar } from "../../components/Toolbar"
import { ScrollView } from "react-native-gesture-handler"
import { LoadingView } from "../../components/LoadingView"
import { getLocalAudioBookCoverUrl } from "../../store/persistence/files"
import { JumpBackwardFifteenIcon } from "../../icons/JumpBackwardFifteenIcon"
import { JumpForwardFifteenIcon } from "../../icons/JumpForwardFifteenIcon"

const events = [Event.PlaybackState, Event.PlaybackTrackChanged]

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
  const [currentTrack, setCurrentTrack] = useState(1)
  const [trackCount, setTrackCount] = useState(1)

  const {
    isLoading,
    isPlaying,
    progress,
    startPosition,
    endPosition,
    remainingTime,
  } = useAudioBook()

  const progressTime = useMemo(() => {
    const relativeProgress = progress - startPosition
    const minutes = Math.floor(relativeProgress / 60)
    const seconds = Math.floor(relativeProgress - minutes * 60)
      .toString()
      .padStart(2, "0")
    return `${minutes}:${seconds}`
  }, [progress, startPosition])

  const remainingProgressTime = useMemo(() => {
    const remainingProgress = endPosition - progress
    const minutes = Math.floor(remainingProgress / 60)
    const seconds = Math.floor(remainingProgress - minutes * 60)
      .toString()
      .padStart(2, "0")
    return `-${minutes}:${seconds}`
  }, [endPosition, progress])

  useTrackPlayerEvents(events, async () => {
    setCurrentTrack(((await TrackPlayer.getActiveTrackIndex()) ?? 0) + 1)
    setTrackCount((await TrackPlayer.getQueue()).length)
  })

  useEffect(() => {
    async function updateStats() {
      setCurrentTrack(((await TrackPlayer.getActiveTrackIndex()) ?? 0) + 1)
      setTrackCount((await TrackPlayer.getQueue()).length)
    }

    updateStats()
  }, [])

  const isPresented = router.canGoBack()

  if (!book) return null

  const title = book.manifest.toc?.find((link) =>
    isSameChapter(link.href, locator?.href ?? ""),
  )?.title

  return (
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

      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {isLoading && <LoadingView />}
        <Image
          aspectRatio={1}
          borderRadius="$1"
          source={{
            uri: getLocalAudioBookCoverUrl(book.id),
            width: dimensions.width - 24 * 2,
            height: dimensions.width - 24 * 2,
          }}
        />
        <H3 alignSelf="flex-start" numberOfLines={2}>
          {book.title}
        </H3>
        <Text alignSelf="flex-start" numberOfLines={1}>
          {title}
        </Text>
        <Text>
          Track {currentTrack} of {trackCount}
        </Text>
        {/* TODO: Use local state and a use effect to make this more responsive */}
        <Slider
          value={[progress]}
          start={startPosition}
          end={endPosition}
          step={1}
          width="100%"
          onValueChange={([newProgress]) =>
            TrackPlayer.seekTo(newProgress ?? 0)
          }
        >
          <Slider.Track backgroundColor="$backgroundStrong">
            <Slider.TrackActive backgroundColor="$brandColor" />
          </Slider.Track>
          <Slider.Thumb
            index={0}
            size="$2"
            borderColor="$brand6"
            backgroundColor="$brandColor"
            circular
          />
        </Slider>
        <XStack alignSelf="stretch" justifyContent="space-between">
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
              TrackPlayer.skipToPrevious()
            }}
          >
            <SkipBack />
          </Button>
          <Button
            circular
            chromeless
            size="$6"
            onPress={async () => {
              const currentPosition = await TrackPlayer.getPosition()
              await TrackPlayer.seekTo(currentPosition - 15)
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
              const currentPosition = await TrackPlayer.getPosition()
              await TrackPlayer.seekTo(currentPosition + 15)
            }}
          >
            <JumpForwardFifteenIcon />
          </Button>
          <Button
            circular
            chromeless
            size="$6"
            onPress={() => {
              TrackPlayer.skipToNext()
            }}
          >
            <SkipForward />
          </Button>
        </XStack>
      </ScrollView>
    </YStack>
  )
}

// import { Link, router } from "expo-router"
// import {
//   Image,
//   Platform,
//   Pressable,
//   StyleSheet,
//   useWindowDimensions,
//   View,
// } from "react-native"
// import { ScrollView } from "react-native-gesture-handler"
// import { ChevronDownIcon } from "../../icons/ChevronDownIcon"
// import { useAppSelector } from "../../store/appState"
// import { UIText } from "../../components/UIText"
// import { HeaderText } from "../../components/HeaderText"
// import { useEffect, useMemo, useState } from "react"
// import TrackPlayer, {
//   useTrackPlayerEvents,
//   Event,
// } from "react-native-track-player"
// import { ProgressBar } from "../../components/ProgressBar"
// import { useAudioBook } from "../../hooks/useAudioBook"
// import { PlayPause } from "../../components/PlayPause"
// import { PrevIcon } from "../../icons/PrevIcon"
// import { NextIcon } from "../../icons/NextIcon"
// import { JumpBackwardFifteenIcon } from "../../icons/JumpBackwardFifteenIcon"
// import { JumpForwardFifteenIcon } from "../../icons/JumpForwardFifteenIcon"
// import {
//   getCurrentlyPlayingBook,
//   getLocator,
// } from "../../store/selectors/bookshelfSelectors"
// import { getLocalAudioBookCoverUrl } from "../../store/persistence/files"
// import { LoadingView } from "../../components/LoadingView"
// import { Toolbar } from "../../components/Toolbar"
// import { ToolbarDialogs } from "../../components/ToolbarDialogs"
// import { areLocatorsEqual } from "../../modules/readium"
// import { isSameChapter } from "../../links"

// const events = [Event.PlaybackState, Event.PlaybackTrackChanged]

// export default function PlayerScreen() {
//   const dimensions = useWindowDimensions()
//   const book = useAppSelector(getCurrentlyPlayingBook)
//   const timestampedLocator = useAppSelector(
//     (state) => book && getLocator(state, book.id),
//   )
//   const locator = timestampedLocator?.locator
//   const activeBookmarks = useMemo(
//     () =>
//       locator && book
//         ? book.bookmarks.filter((bookmark) =>
//             areLocatorsEqual(bookmark, locator),
//           )
//         : [],
//     [book, locator],
//   )
//   const [currentTrack, setCurrentTrack] = useState(1)
//   const [trackCount, setTrackCount] = useState(1)

//   const {
//     isLoading,
//     isPlaying,
//     progress,
//     startPosition,
//     endPosition,
//     remainingTime,
//   } = useAudioBook()

//   const progressTime = useMemo(() => {
//     const relativeProgress = progress - startPosition
//     const minutes = Math.floor(relativeProgress / 60)
//     const seconds = Math.floor(relativeProgress - minutes * 60)
//       .toString()
//       .padStart(2, "0")
//     return `${minutes}:${seconds}`
//   }, [progress, startPosition])

//   const remainingProgressTime = useMemo(() => {
//     const remainingProgress = endPosition - progress
//     const minutes = Math.floor(remainingProgress / 60)
//     const seconds = Math.floor(remainingProgress - minutes * 60)
//       .toString()
//       .padStart(2, "0")
//     return `-${minutes}:${seconds}`
//   }, [endPosition, progress])

//   useTrackPlayerEvents(events, async () => {
//     setCurrentTrack(((await TrackPlayer.getActiveTrackIndex()) ?? 0) + 1)
//     setTrackCount((await TrackPlayer.getQueue()).length)
//   })

//   useEffect(() => {
//     async function updateStats() {
//       setCurrentTrack(((await TrackPlayer.getActiveTrackIndex()) ?? 0) + 1)
//       setTrackCount((await TrackPlayer.getQueue()).length)
//     }

//     updateStats()
//   }, [])

//   const isPresented = router.canGoBack()

//   if (!book) return null

//   const title = book.manifest.toc?.find((link) =>
//     isSameChapter(link.href, locator?.href ?? ""),
//   )?.title

//   return (
//     <View style={styles.container}>
//       <ToolbarDialogs />
//       <View style={styles.topbar}>
//         {isPresented ? (
//           <Pressable
//             hitSlop={20}
//             onPress={() => {
//               router.back()
//             }}
//           >
//             <ChevronDownIcon />
//           </Pressable>
//         ) : (
//           <Link href="/">
//             <ChevronDownIcon />
//           </Link>
//         )}
//         <Toolbar mode="audio" activeBookmarks={activeBookmarks} />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Native modals have dark backgrounds on iOS, set the status bar to light content. */}
//         {/* <StatusBar style="light" /> */}
//         {isLoading && <LoadingView />}
//         <Image
//           style={[
//             styles.cover,
//             {
//               width: dimensions.width - styles.cover.padding * 2,
//             },
//           ]}
//           source={{ uri: getLocalAudioBookCoverUrl(book.id) }}
//         />
//         <View style={styles.details}>
//           <HeaderText numberOfLines={2} style={styles.title}>
//             {book.title}
//           </HeaderText>
//           <UIText numberOfLines={1} style={styles.parts}>
//             {title}
//           </UIText>
//         </View>
//         <View style={styles.progressBarWrapper}>
//           <UIText style={styles.trackCount}>
//             Track {currentTrack} of {trackCount}
//           </UIText>
//           <ProgressBar
//             start={startPosition}
//             stop={endPosition}
//             progress={progress}
//             onProgressChange={(newProgress) => {
//               TrackPlayer.seekTo(newProgress)
//             }}
//           />
//         </View>
//         <View style={styles.timeDetails}>
//           <UIText style={styles.progressTime}>{progressTime}</UIText>
//           <UIText style={styles.totalTimeLeft}>{remainingTime} left</UIText>
//           <UIText style={styles.remainingProgressTime}>
//             {remainingProgressTime}
//           </UIText>
//         </View>
//         <View style={styles.playerControls}>
//           <Pressable
//             onPress={() => {
//               TrackPlayer.skipToPrevious()
//             }}
//           >
//             <PrevIcon />
//           </Pressable>
//           <Pressable
//             onPress={async () => {
//               const currentPosition = await TrackPlayer.getPosition()
//               await TrackPlayer.seekTo(currentPosition - 15)
//             }}
//           >
//             <JumpBackwardFifteenIcon />
//           </Pressable>
//           <PlayPause style={styles.playPause} isPlaying={isPlaying} />
//           <Pressable
//             onPress={async () => {
//               const currentPosition = await TrackPlayer.getPosition()
//               await TrackPlayer.seekTo(currentPosition + 15)
//             }}
//           >
//             <JumpForwardFifteenIcon />
//           </Pressable>
//           <Pressable
//             onPress={() => {
//               TrackPlayer.skipToNext()
//             }}
//           >
//             <NextIcon />
//           </Pressable>
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollContent: {
//     alignItems: "center",
//   },
//   topbar: {
//     paddingTop: 12,
//     paddingBottom: 8,
//     paddingHorizontal: 18,
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   cover: {
//     padding: 24,
//     aspectRatio: 1,
//     borderRadius: 4,
//   },
//   trackCount: {
//     alignSelf: "center",
//     ...(Platform.OS === "android" && {
//       marginBottom: 12,
//     }),
//   },
//   details: {
//     width: "100%",
//     paddingTop: 24,
//     paddingHorizontal: 24,
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 8,
//   },
//   parts: {
//     fontSize: 18,
//     marginBottom: 16,
//   },
//   progressBarWrapper: {
//     width: "100%",
//     paddingHorizontal: 24,
//     ...(Platform.OS === "android" && {
//       marginBottom: 8,
//     }),
//   },
//   playerControls: {
//     marginTop: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingBottom: 24,
//     gap: 24,
//   },
//   playPause: {
//     width: 80,
//     height: 80,
//   },
//   timeDetails: {
//     width: "100%",
//     paddingHorizontal: 24,
//     paddingVertical: 4,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   progressTime: {
//     width: 60,
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   totalTimeLeft: {
//     fontSize: 12,
//   },
//   remainingProgressTime: {
//     width: 60,
//     textAlign: "right",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// })
