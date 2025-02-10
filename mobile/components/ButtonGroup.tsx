import { ReactElement, createContext, useContext, useMemo } from "react"
import { Pressable, PressableProps, StyleSheet, View } from "react-native"
import { appColor } from "../design"
import { ThemeOverrideProvider } from "./ThemeOverrideProvider"
import { Button, ButtonProps } from "tamagui"

type ButtonGroupContextValue = {
  onPress: (value: unknown) => void
  currentValue: unknown
}

const ButtonGroupContext = createContext(
  null as unknown as ButtonGroupContextValue,
)

type Props<Value> = {
  children: ReactElement<{ value: Value }>[]
  onChange: (value: Value) => void
  value: Value
}

export function ButtonGroup<Value>({
  value,
  onChange,
  children,
}: Props<Value>) {
  const contextValue = useMemo(
    () =>
      ({
        currentValue: value,
        onPress: onChange as (value: unknown) => void,
      }) satisfies ButtonGroupContextValue,
    [onChange, value],
  )

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <View style={styles.group}>{children}</View>
    </ButtonGroupContext.Provider>
  )
}

export function ButtonGroupButton<Value>({
  value,
  ...props
}: ButtonProps & { value: Value }) {
  const { onPress, currentValue } = useContext(ButtonGroupContext)
  return (
    <Button
      {...props}
      size="$3.5"
      onPress={() => onPress(value)}
      backgroundColor={currentValue === value ? "$brandColor" : "transparent"}
      color="$white1"
    />
  )
}

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  active: {
    backgroundColor: appColor,
  },
})
