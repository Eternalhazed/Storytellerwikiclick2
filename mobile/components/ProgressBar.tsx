import { StyleSheet, View } from "react-native"
import { appColor } from "../design"
import { Slider } from "tamagui"

type Props = {
  start?: number
  stop?: number
  progress: number
  disabled?: boolean
  onProgressChange?: (newProgress: number) => void
}

export function ProgressBar({
  start = 0,
  stop = 100,
  progress,
  disabled = false,
  onProgressChange,
}: Props) {
  if (onProgressChange) {
    return (
      <Slider
        style={{ height: 3 }}
        min={start}
        max={stop || 1}
        value={[progress]}
        step={1}
        disabled={disabled}
        onValueChange={([newProgress]) => {
          onProgressChange(newProgress ?? 0)
        }}
      >
        <Slider.Track backgroundColor="$backgroundStrong">
          <Slider.TrackActive backgroundColor="$brandColor" />
        </Slider.Track>
        {!disabled && (
          <Slider.Thumb
            index={0}
            size="$2"
            hitSlop={40}
            borderColor="$brand6"
            backgroundColor="$brandColor"
            circular
          />
        )}
      </Slider>
    )
  }

  return (
    <View style={[styles.outer]}>
      <View
        style={[styles.inner, { width: `${(progress / stop - start) * 100}%` }]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    height: 3,
    backgroundColor: "#EAEAEA",
  },
  inner: {
    borderBottomLeftRadius: 4,
    height: 3,
    backgroundColor: appColor,
    position: "absolute",
  },
})
