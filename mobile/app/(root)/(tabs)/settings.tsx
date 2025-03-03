import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppDispatch, useAppSelector } from "../../../store/appState"
import { getApiBaseUrl } from "../../../store/selectors/apiSelectors"
import { getUsername } from "../../../store/selectors/authSelectors"
import { ScrollView, SizableText, View, Button } from "tamagui"
import { UIText } from "../../../components/UIText"
import { authSlice } from "../../../store/slices/authSlice"
import { Link } from "expo-router"
import { apiSlice } from "../../../store/slices/apiSlice"
import { getDebugLoggingEnabled } from "../../../store/selectors/loggingSelectors"
import { loggingSlice } from "../../../store/slices/loggingSlice"
import { UILink } from "../../../components/UILink"
import { buttonStyles } from "../../../components/Button"
import { ReadingSettings } from "../../../components/ReadingSettings"

export default function Settings() {
  const { top } = useSafeAreaInsets()
  const apiBaseUrl = useAppSelector(getApiBaseUrl)
  const username = useAppSelector(getUsername)
  const debugEnabled = useAppSelector(getDebugLoggingEnabled)
  const dispatch = useAppDispatch()

  return (
    <View
      flex={1}
      alignItems="flex-start"
      paddingHorizontal={24}
      paddingTop={top}
    >
      <SizableText marginVertical={32} size="$4" fontFamily="$heading">
        Settings
      </SizableText>
      <ScrollView w="100%">
        <View>
          {apiBaseUrl ? (
            <>
              <UIText>Logged in to:</UIText>
              <UIText>{apiBaseUrl}</UIText>
              <Button
                size="$6"
                my="$4"
                onPress={() => {
                  dispatch(apiSlice.actions.changeServerButtonTapped())
                }}
              >
                <UIText>Change server</UIText>
              </Button>
            </>
          ) : (
            <UILink style={buttonStyles.button} href="/server">
              Choose server
            </UILink>
          )}
        </View>
        {apiBaseUrl && (
          <View>
            {username ? (
              <>
                <UIText>Logged in as:</UIText>
                <UIText>{username}</UIText>
                <Button
                  size="$6"
                  my="$4"
                  onPress={() => {
                    dispatch(authSlice.actions.logoutButtonTapped())
                  }}
                >
                  <UIText>Log out</UIText>
                </Button>
              </>
            ) : (
              <Link href="/login" style={buttonStyles.button}>
                Log in
              </Link>
            )}
          </View>
        )}
        <ReadingSettings />
        <View>
          <SizableText size="$4" fontWeight="bold" marginVertical={12}>
            Logging
          </SizableText>
          <Button
            onPress={() => {
              dispatch(loggingSlice.actions.debugLoggingToggled())
            }}
          >
            <UIText>{debugEnabled ? "Disable" : "Enable"} debug logging</UIText>
          </Button>
          <UILink href="log">View logs</UILink>
        </View>
      </ScrollView>
    </View>
  )
}
