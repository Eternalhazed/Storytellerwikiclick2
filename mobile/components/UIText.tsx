import { Text, TextProps } from "react-native"
import { useDarkMode } from "../hooks/useColorTheme"

export function UIText({ children, ...props }: TextProps) {
  const { foreground } = useDarkMode()

  return (
    <Text {...props} style={[{ color: foreground }, props.style]}>
      {children}
    </Text>
  )
}
