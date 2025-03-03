import { ChevronUp } from "@tamagui/lucide-icons"
import { Adapt, Select, Sheet, YStack } from "tamagui"
import { useAppSelector } from "../store/appState"
import { getGlobalPreferences } from "../store/selectors/preferencesSelectors"
// import { LinearGradient } from "tamagui/linear-gradient"

interface Props {
  value: string
  onChange: (value: string) => void
}

export function ThemeSelector({ value, onChange }: Props) {
  const preferences = useAppSelector(getGlobalPreferences)
  return (
    <Select value={value} onValueChange={onChange}>
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
            {preferences.colorThemes.map((theme, index) => (
              <Select.Item key={theme.name} index={index} value={theme.name}>
                <Select.ItemText>{theme.name}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select>
  )
}
