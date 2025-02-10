import { ChevronUp } from "@tamagui/lucide-icons"
import { Adapt, Select, Sheet, YStack } from "tamagui"
import { useAppDispatch, useAppSelector } from "../store/appState"
import { getGlobalPreferences } from "../store/selectors/preferencesSelectors"
import { preferencesSlice } from "../store/slices/preferencesSlice"
// import { LinearGradient } from "tamagui/linear-gradient"

interface Props {
  bookId?: number
}

export function FontSelector({ bookId }: Props) {
  const preferences = useAppSelector(getGlobalPreferences)
  const dispatch = useAppDispatch()
  return (
    <Select
      value={preferences.typography.fontFamily}
      onValueChange={(value) => {
        const update = {
          typography: {
            ...preferences.typography,
            fontFamily: value,
          },
        }
        const action = bookId
          ? preferencesSlice.actions.bookPreferencesUpdated({
              bookId,
              prefs: update,
            })
          : preferencesSlice.actions.globalPreferencesUpdated(update)
        dispatch(action)
      }}
    >
      <Select.Trigger fg={0} fs={1}>
        <Select.Value />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          {/* <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          /> */}
        </Select.ScrollUpButton>

        <Select.Viewport>
          <Select.Group>
            <Select.Label />
            <Select.Item index={0} value="Bookerly">
              <Select.ItemText>Bookerly</Select.ItemText>
            </Select.Item>
            <Select.Item index={0} value="Literata">
              <Select.ItemText>Literata</Select.ItemText>
            </Select.Item>
            <Select.Item index={0} value="OpenDyslexic">
              <Select.ItemText>OpenDyslexic</Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  )
}
