import { StyleSheet, View, Image } from "react-native"
import { useAudioBook } from "../hooks/useAudioBook"
import { useAppDispatch, useAppSelector } from "../store/appState"
import { getCurrentlyPlayingBook } from "../store/selectors/bookshelfSelectors"
import { useColorTheme } from "../hooks/useColorTheme"
import { useState, useEffect } from "react"
import { ProgressBar } from "./ProgressBar"
import { playerPositionSeeked } from "../store/slices/bookshelfSlice"
import { Link } from "expo-router"
import { Pressable } from "react-native-gesture-handler"
import { getLocalAudioBookCoverUrl } from "../store/persistence/files"
import { UIText } from "./UIText"
import { PlayPause } from "./PlayPause"
import { spacing } from "./ui/tokens/spacing"

export function MiniPlayerWidget() {
  const { foreground, background } = useColorTheme()

  const { isPlaying, isLoading, progress, startPosition, endPosition } =
    useAudioBook()

  const dispatch = useAppDispatch()
  const [eagerProgress, setEagerProgress] = useState(progress)

  useEffect(() => {
    setEagerProgress(progress)
  }, [progress])

  const book = useAppSelector(getCurrentlyPlayingBook)

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
            style={{
              paddingVertical: 15,
              paddingLeft: 15,
              paddingRight: spacing[4],
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: spacing[3],
            }}
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
                <UIText
                  style={{
                    flex: 1,
                  }}
                  numberOfLines={2}
                >
                  {book.title}
                </UIText>
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
