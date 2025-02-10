import { Text, TextProps } from "react-native"
import { useDarkMode } from "../hooks/useColorTheme"

export function HeaderText({ children, ...props }: TextProps) {
  const { foreground } = useDarkMode()

  return (
    <Text
      {...props}
      style={[{ fontFamily: "YoungSerif" }, props.style, { color: foreground }]}
    >
      {children}
    </Text>
  )
}
