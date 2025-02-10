import { View as RNView } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useRef } from "react"
import { Popover, usePopoverContext, View, SizableText, Button } from "tamagui"
import { useAudioBook } from "../hooks/useAudioBook"
import TrackPlayer from "react-native-track-player"
import { useAppDispatch } from "../store/appState"
import { playerTrackChanged } from "../store/slices/bookshelfSlice"

export function TrackList() {
  const popover = usePopoverContext()
  const ref = useRef<null | ScrollView>(null)
  const currentItemRef = useRef<null | RNView>(null)

  const dispatch = useAppDispatch()

  const { track: currentTrack, tracks } = useAudioBook()

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
      {tracks.map((track, index) => (
        <View
          collapsable={false}
          key={track.relativeUrl}
          {...(currentTrack.index === index && {
            ref: currentItemRef,
          })}
          px="$2"
        >
          <Button
            onPress={async () => {
              popover.onOpenChange(false, "press")
              dispatch(playerTrackChanged({ index }))
            }}
            chromeless
            br="$0"
            bbw={1}
            bbc="$borderColor"
            justifyContent="flex-start"
            h="$7"
            bg={currentTrack.index === index ? "$background" : undefined}
            noTextWrap
          >
            <SizableText size="$3.5" numberOfLines={2}>
              Track {index + 1}
            </SizableText>
          </Button>
        </View>
      ))}
    </Popover.ScrollView>
  )
}
