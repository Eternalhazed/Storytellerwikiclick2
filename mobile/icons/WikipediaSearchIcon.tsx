import { Path, Svg } from "react-native-svg"
import { useColorTheme } from "../hooks/useColorTheme"

export function WikipediaSearchIcon() {
  const { foreground } = useColorTheme()
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M11 2a9 9 0 016.32 15.32l4.69 4.69-1.41 1.41-4.69-4.69A9 9 0 1111 2z"
        stroke={foreground}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 6a5 5 0 100 10 5 5 0 000-10z"
        stroke={foreground}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
