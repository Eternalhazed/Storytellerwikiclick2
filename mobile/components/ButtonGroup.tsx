import { ReactElement, createContext, useContext, useMemo } from "react"
import { StyleSheet, View } from "react-native"
import { Button, ButtonProps } from "./ui/Button"

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
      onPress={() => onPress(value)}
      variant={currentValue === value ? "primary" : "secondary"}
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
})
