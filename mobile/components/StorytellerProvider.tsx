import { ReactNode, useEffect } from "react"
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { getStartupStatus } from "../store/selectors/startupSelectors"
import { StartupStatus } from "../store/slices/startupSlice"
import { useRouter } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useAppSelector } from "../store/appState"
import { useDarkMode } from "../hooks/useColorTheme"
import { TamaguiProvider } from "tamagui"
import { tamaguiConfig } from "../design/tamaguiConfig"
import { getGlobalPreferences } from "../store/selectors/preferencesSelectors"

export function StorytellerProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const startupStatus = useAppSelector(getStartupStatus)
  const { dark } = useDarkMode()
  const preferences = useAppSelector(getGlobalPreferences)

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
      defaultTheme={dark ? preferences.darkTheme : preferences.lightTheme}
    >
      <ThemeProvider
        value={
          dark
            ? DarkTheme
            : {
                ...DefaultTheme,
                colors: { ...DefaultTheme.colors, background: "white" },
              }
        }
      >
        {startupStatus !== StartupStatus.HYDRATED &&
        startupStatus !== StartupStatus.IN_ERROR
          ? null
          : children}
      </ThemeProvider>
    </TamaguiProvider>
  )
}
