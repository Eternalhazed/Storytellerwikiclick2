import Svg, { Path } from "react-native-svg"

export function NoteIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24">
      <Path
        d="M9 9h6M9 13h6M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
