import { Image, Pressable, StyleSheet } from "react-native"
import { useAudioBook } from "../hooks/useAudioBook"
import { useAppDispatch, useAppSelector } from "../store/appState"
import { getCurrentlyPlayingBook } from "../store/selectors/bookshelfSelectors"
import { useColorTheme } from "../hooks/useColorTheme"
import { Link } from "expo-router"
import { useState, useEffect } from "react"
import { getLocalAudioBookCoverUrl } from "../store/persistence/files"
import { playerPositionSeeked } from "../store/slices/bookshelfSlice"
import { PlayPause } from "./PlayPause"
import { ProgressBar } from "./ProgressBar"
import { SizableText, View } from "tamagui"

export function MiniPlayerWidget() {
  const { foreground, background } = useColorTheme()

  const book = useAppSelector(getCurrentlyPlayingBook)
  const { isPlaying, isLoading, progress, startPosition, endPosition } =
    useAudioBook()

  const dispatch = useAppDispatch()
  const [eagerProgress, setEagerProgress] = useState(progress)

  useEffect(() => {
    setEagerProgress(progress)
  }, [progress])

  return (
    <View
      style={[
        styles.player,
        { backgroundColor: background, shadowColor: foreground },
      ]}
    >
      {book && (
        <View>
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  player: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    zIndex: 1000,
    borderRadius: 4,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
})
