import { Pressable, StyleSheet } from "react-native"
import { SizableText, View, Select, Button, Slider } from "tamagui"
// import Select from "react-native-picker-select"
import { dequal } from "dequal"
import { appColor } from "../design"
import { formatNumber } from "../formatting"
import {
  defaultPreferences,
  preferencesSlice,
} from "../store/slices/preferencesSlice"
import { ButtonGroup, ButtonGroupButton } from "./ButtonGroup"
import { HighlightColorPicker } from "./HighlightColorPicker"
import { UIText } from "./UIText"
import { useDarkMode } from "../hooks/useColorTheme"
import { useAppDispatch, useAppSelector } from "../store/appState"
import {
  getFilledBookPreferences,
  getGlobalPreferences,
} from "../store/selectors/preferencesSelectors"
import { useMemo } from "react"
import { ThemeSelector } from "./ThemeSelector"
import { FontSelector } from "./FontSelector"

type Props = {
  bookId?: number
}

export function ReadingSettings({ bookId }: Props) {
  const globalPreferences = useAppSelector(getGlobalPreferences)
  const preferences = useAppSelector((state) =>
    bookId === undefined
      ? globalPreferences
      : getFilledBookPreferences(state, bookId),
  )

  const dirty = useMemo(
    () => dequal(globalPreferences, preferences),
    [globalPreferences, preferences],
  )

  const { foreground, dark } = useDarkMode()
  const dispatch = useAppDispatch()

  return (
    <View>
      <SizableText size="$6" fontWeight="bold" my={12}>
        Colors
      </SizableText>
      <View w="100%" fd="row" jc="space-between" ai="center" my="$3">
        <SizableText size="$4">Dark mode</SizableText>
        <ButtonGroup
          value={preferences.darkMode}
          onChange={(value: boolean | "auto") =>
            dispatch(
              preferencesSlice.actions.globalPreferencesUpdated({
                darkMode: value,
              }),
            )
          }
        >
          <ButtonGroupButton value={false}>
            <SizableText
              color={preferences.darkMode === false ? "$white1" : undefined}
              size="$3.5"
            >
              Light
            </SizableText>
          </ButtonGroupButton>
          <ButtonGroupButton value={"auto"}>
            <SizableText
              color={preferences.darkMode === "auto" ? "$white1" : undefined}
              size="$3.5"
            >
              Device
            </SizableText>
          </ButtonGroupButton>
          <ButtonGroupButton value={true}>
            <SizableText
              color={preferences.darkMode === true ? "$white1" : undefined}
              size="$3.5"
            >
              Dark
            </SizableText>
          </ButtonGroupButton>
        </ButtonGroup>
      </View>
      <View gap="$8" w="100%" fd="row" jc="space-between" ai="center" my="$3">
        <SizableText size="$4">Light theme</SizableText>
        <ThemeSelector
          value={preferences.lightTheme}
          onChange={(value) => {
            dispatch(
              preferencesSlice.actions.globalPreferencesUpdated({
                lightTheme: value,
              }),
            )
          }}
        />
      </View>
      <View gap="$8" w="100%" fd="row" jc="space-between" ai="center" my="$3">
        <SizableText size="$4">Dark theme</SizableText>
        <ThemeSelector
          value={preferences.darkTheme}
          onChange={(value) => {
            dispatch(
              preferencesSlice.actions.globalPreferencesUpdated({
                darkTheme: value,
              }),
            )
          }}
        />
      </View>
      <View w="100%" fd="column" jc="space-between" ai="flex-start" my="$3">
        <SizableText size="$4">Readaloud color</SizableText>
        <HighlightColorPicker
          style={{ alignSelf: "flex-end" }}
          value={preferences.readaloudColor}
          onChange={(color) => {
            dispatch(
              preferencesSlice.actions.globalPreferencesUpdated({
                readaloudColor: color,
              }),
            )
          }}
        />
      </View>
      <View fd="row" ai="center" jc="space-between">
        <SizableText size="$6" fontWeight="bold" my={12}>
          Typography{!bookId && " defaults"}
        </SizableText>
        {bookId ? (
          <Pressable
            disabled={dirty}
            onPress={() => {
              dispatch(
                preferencesSlice.actions.bookPreferencesSetAsDefaults({
                  bookId,
                }),
              )
            }}
          >
            <UIText style={dirty ? styles.disabled : styles.pressable}>
              Set as defaults
            </UIText>
          </Pressable>
        ) : (
          <Button
            chromeless
            size="$3"
            disabled={preferences.typography === defaultPreferences.typography}
            onPress={() => {
              dispatch(preferencesSlice.actions.typographyPreferencesReset())
            }}
          >
            <SizableText
              size="$3.5"
              color={
                preferences.typography !== defaultPreferences.typography
                  ? "$brandColor"
                  : undefined
              }
              opacity={
                preferences.typography === defaultPreferences.typography
                  ? 0.6
                  : undefined
              }
            >
              Reset
            </SizableText>
          </Button>
        )}
      </View>

      <View gap={16} w="100%" fd="row" jc="space-between" ai="flex-end" my="$3">
        <SizableText size="$4">Font scaling</SizableText>
        <View ai="stretch" jc="space-between" fg={1} gap={16}>
          <SizableText size="$3" als="center">
            {formatNumber(preferences.typography.scale, 2)}x
          </SizableText>
          <Slider
            h={3}
            min={0.7}
            max={1.5}
            value={[preferences.typography.scale]}
            step={0.05}
            onValueChange={([value]) => {
              const update = {
                typography: {
                  ...preferences.typography,
                  // Rounding to hundredths to account for floating point errors
                  scale: Math.round((value ?? 0) * 100) / 100,
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
            <Slider.Track backgroundColor="$backgroundStrong">
              <Slider.TrackActive backgroundColor="$brandColor" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              size="$2"
              hitSlop={40}
              borderColor="$brand6"
              backgroundColor="$brandColor"
              circular
            />
          </Slider>
        </View>
      </View>
      <View gap={16} w="100%" fd="row" jc="space-between" ai="flex-end" my="$3">
        <SizableText size="$4">Line height</SizableText>
        <View ai="stretch" jc="space-between" fg={1} gap={16}>
          <SizableText size="$3" als="center">
            {formatNumber(preferences.typography.lineHeight, 2)}x
          </SizableText>
          <Slider
            style={{ height: 3 }}
            min={0.7}
            max={1.5}
            value={[preferences.typography.lineHeight]}
            step={0.05}
            onValueChange={([value]) => {
              const update = {
                typography: {
                  ...preferences.typography,
                  // Rounding to hundredths to account for floating point errors
                  lineHeight: Math.round((value ?? 0) * 100) / 100,
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
            <Slider.Track backgroundColor="$backgroundStrong">
              <Slider.TrackActive backgroundColor="$brandColor" />
            </Slider.Track>
            <Slider.Thumb
              index={0}
              size="$2"
              hitSlop={40}
              borderColor="$brand6"
              backgroundColor="$brandColor"
              circular
            />
          </Slider>
        </View>
      </View>
      <View style={styles.field}>
        <SizableText size="$4">Text alignment</SizableText>
        <ButtonGroup
          value={preferences.typography.alignment}
          onChange={(value: "justify" | "left") => {
            const update = {
              typography: {
                ...preferences.typography,
                alignment: value,
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
          <ButtonGroupButton value="justify">
            <SizableText
              color={
                preferences.typography.alignment === "justify"
                  ? "$white1"
                  : undefined
              }
              size="$3.5"
            >
              Justify
            </SizableText>
          </ButtonGroupButton>
          <ButtonGroupButton value="left">
            <SizableText
              color={
                preferences.typography.alignment === "left"
                  ? "$white1"
                  : undefined
              }
              size="$3.5"
            >
              Left
            </SizableText>
          </ButtonGroupButton>
        </ButtonGroup>
      </View>
      <View gap="$8" w="100%" fd="row" jc="space-between" ai="center" my="$3">
        <SizableText size="$4">Font family</SizableText>
        <FontSelector />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  subsubheading: {
    fontSize: 22,
    fontWeight: "600",
    marginVertical: 12,
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
  },
  field: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  label: {
    fontSize: 18,
  },
  typographyHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pressable: {
    color: appColor,
  },
  disabled: {
    opacity: 0.6,
  },
  sliderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 3,
  },
  slider: { height: 16, flexBasis: 200 },
})
