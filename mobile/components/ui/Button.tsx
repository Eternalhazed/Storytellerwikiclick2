import {
  BorderlessButton,
  BorderlessButtonProps,
  RectButton,
  RectButtonProps,
} from "react-native-gesture-handler"
import { colors } from "./tokens/colors"
import { ThemeOverrideProvider } from "../ThemeOverrideProvider"
import { useColorTheme } from "../../hooks/useColorTheme"
import { spacing } from "./tokens/spacing"

export type ButtonProps = { variant?: "primary" | "secondary" } & (
  | RectButtonProps
  | ({ chromeless?: boolean } & BorderlessButtonProps)
)

export function Button({
  variant = "secondary",
  children,
  ...props
}: ButtonProps) {
  const { surface } = useColorTheme()

  if ("chromeless" in props) {
    return <BorderlessButton {...props}>{children}</BorderlessButton>
  }
  const button = (
    <RectButton
      underlayColor={variant === "primary" ? colors.primary9 : surface}
      {...props}
      style={[
        {
          paddingVertical: spacing[1],
          paddingHorizontal: spacing["1.5"],
          borderRadius: spacing.borderRadius,
          backgroundColor: variant === "primary" ? colors.primary9 : surface,
        },
        props.style,
      ]}
    >
      {children}
    </RectButton>
  )

  if (variant === "secondary") return button

  return (
    <ThemeOverrideProvider foreground={colors.white}>
      {button}
    </ThemeOverrideProvider>
  )
}
