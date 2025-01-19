import { ReactNode, useEffect } from "react"
import { DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { getStartupStatus } from "../store/selectors/startupSelectors"
import { StartupStatus } from "../store/slices/startupSlice"
import { useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useAppSelector } from "../store/appState"
import { useColorTheme } from "../hooks/useColorTheme"
import { activeBackgroundColor } from "../design"
import { TamaguiProvider } from "tamagui"
import { tamaguiConfig } from "../design/tamaguiConfig"

export function StorytellerProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const startupStatus = useAppSelector(getStartupStatus)
  const { foreground, background, dark } = useColorTheme()

  useEffect(() => {
    if (
      startupStatus === StartupStatus.HYDRATED ||
      startupStatus === StartupStatus.IN_ERROR
    ) {
      SplashScreen.hide()
    }
  }, [router, startupStatus])

  return (
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={dark ? "nightBlack" : "paperWhite"}
    >
      <ThemeProvider
        value={{
          ...DefaultTheme,
          dark,
          colors: {
            primary: foreground,
            background,
            card: background,
            text: foreground,
            border: activeBackgroundColor,
            notification: background,
          },
        }}
      >
        {startupStatus !== StartupStatus.HYDRATED &&
        startupStatus !== StartupStatus.IN_ERROR
          ? null
          : children}
      </ThemeProvider>
    </TamaguiProvider>
  )
}
