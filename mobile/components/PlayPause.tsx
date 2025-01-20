import { ActivityIndicator, ViewProps } from "react-native"
import TrackPlayer from "react-native-track-player"
import { Button, useTheme } from "tamagui"
import { Pause, Play } from "@tamagui/lucide-icons"

type Props = {
  style?: ViewProps["style"]
  isPlaying: boolean
  isLoading?: boolean
}

export function PlayPause({ isPlaying, isLoading = false }: Props) {
  const { color } = useTheme()

  if (isLoading) return <ActivityIndicator />

  return isPlaying ? (
    <Button
      chromeless
      px="$1"
      onPress={() => {
        TrackPlayer.pause()
      }}
    >
      <Pause fill={color.val} stroke={color.val} />
    </Button>
  ) : (
    <Button
      chromeless
      px="$1"
      onPress={() => {
        TrackPlayer.play()
      }}
    >
      <Play
        backgroundColor="$colorTransparent"
        fill={color.val}
        stroke={color.val}
      />
    </Button>
  )
}
