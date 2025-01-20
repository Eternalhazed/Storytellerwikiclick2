import { Image, Pressable, StyleProp, ViewStyle } from "react-native"
import { getLocalAudioBookCoverUrl } from "../store/persistence/files"
import { ProgressBar } from "./ProgressBar"
import { PlayPause } from "./PlayPause"
import { Link } from "expo-router"
import {
  BookshelfBook,
  playerPositionSeeked,
} from "../store/slices/bookshelfSlice"
import { SizableText, View } from "tamagui"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../store/appState"

type Props = {
  book: BookshelfBook | null
  isPlaying: boolean
  isLoading: boolean
  progress: number
  startPosition: number
  endPosition: number
  style?: StyleProp<ViewStyle>
}

export function MiniPlayer({
  book,
  isPlaying,
  isLoading,
  progress,
  startPosition,
  endPosition,
  style,
}: Props) {
  const dispatch = useAppDispatch()
  const [eagerProgress, setEagerProgress] = useState(progress)

  useEffect(() => {
    setEagerProgress(progress)
  }, [progress])

  return !book ? null : (
    <View style={style}>
      <ProgressBar
        start={startPosition}
        stop={endPosition}
        progress={eagerProgress}
        onProgressChange={(value) => {
          setEagerProgress(value)
          dispatch(playerPositionSeeked({ progress: value }))
        }}
      />

      <View
        py={15}
        pl={15}
        pr="$4"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="$3"
      >
        <Link href="/player" asChild>
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Image
              style={{
                height: 40,
                width: 40,
                borderRadius: 4,
              }}
              source={{ uri: getLocalAudioBookCoverUrl(book.id) }}
            />
            <SizableText size="$3.5" flex={1} numberOfLines={2}>
              {book.title}
            </SizableText>
          </Pressable>
        </Link>
        <PlayPause isPlaying={isPlaying} isLoading={isLoading} />
      </View>
    </View>
  )
}
