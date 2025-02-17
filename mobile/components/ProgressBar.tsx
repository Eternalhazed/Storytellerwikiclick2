import { StyleProp, StyleSheet, View, ViewProps } from "react-native"
import Slider from "@react-native-community/slider"
import { appColor } from "../design"
import { colors } from "./ui/tokens/colors"

type Props = {
  style?: StyleProp<ViewProps>
  start?: number
  stop?: number
  progress: number
  onProgressChange?: ((newProgress: number) => void) | undefined
}

export function ProgressBar({
  style,
  start = 0,
  stop = 100,
  progress,
  onProgressChange,
}: Props) {
  if (onProgressChange) {
    return (
      <View style={{ marginTop: -18, marginBottom: -18 }}>
        <Slider
          style={{ height: 3 }}
          minimumValue={start}
          maximumValue={stop}
          value={progress}
          minimumTrackTintColor={colors.primary9}
          maximumTrackTintColor={colors.gray2}
          thumbTintColor={colors.primary9}
          onValueChange={(value) => {
            if (value === progress) return
            onProgressChange(value)
          }}
        />
      </View>
    )
  }

  return (
    <View style={[styles.outer, style]}>
      <View
        style={[
          styles.inner,
          { width: `${(progress / (stop - start)) * 100}%` },
        ]}
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
