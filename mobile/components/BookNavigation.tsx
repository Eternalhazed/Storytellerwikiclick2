import { Pressable, StyleSheet, View } from "react-native"
import { TableOfContents } from "./TableOfContents"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useState } from "react"
import { UIText } from "./UIText"
import { Bookmarks } from "./Bookmarks"
import { Highlights } from "./Highlights"
import { useDarkMode } from "../hooks/useColorTheme"

type Props = {
  topInset?: number | undefined
}

enum BookNavTab {
  TABLE_OF_CONTENTS = "TABLE_OF_CONTENTS",
  BOOKMARKS = "BOOKMARKS",
  HIGHLIGHTS = "HIGHLIGHTS",
}

export function BookNavigation({ topInset }: Props) {
  const { background, foreground } = useDarkMode()
  const [selectedTab, setSelectedTab] = useState(BookNavTab.TABLE_OF_CONTENTS)
  const insets = useSafeAreaInsets()

  return (
    <>
      <View
        style={[
          styles.dialog,
          { top: insets.top + styles.dialog.top + (topInset ?? 0) },
          { backgroundColor: background, shadowColor: foreground },
        ]}
      >
        <View style={styles.tabs}>
          <Pressable
            style={styles.tab}
            onPress={() => {
              setSelectedTab(BookNavTab.TABLE_OF_CONTENTS)
            }}
          >
            <UIText
              style={
                selectedTab === BookNavTab.TABLE_OF_CONTENTS &&
                styles.selectedTab
              }
            >
              Contents
            </UIText>
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => {
              setSelectedTab(BookNavTab.BOOKMARKS)
            }}
          >
            <UIText
              style={selectedTab === BookNavTab.BOOKMARKS && styles.selectedTab}
            >
              Bookmarks
            </UIText>
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => {
              setSelectedTab(BookNavTab.HIGHLIGHTS)
            }}
          >
            <UIText
              style={
                selectedTab === BookNavTab.HIGHLIGHTS && styles.selectedTab
              }
            >
              Highlights
            </UIText>
          </Pressable>
        </View>
        {selectedTab === BookNavTab.TABLE_OF_CONTENTS ? (
          <TableOfContents />
        ) : selectedTab === BookNavTab.BOOKMARKS ? (
          <Bookmarks />
        ) : (
          <Highlights />
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#AAA",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  dialog: {
    position: "absolute",
    right: 32,
    left: 74,
    top: 12,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#AAA",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    bottom: 100,
    zIndex: 3,
    elevation: 3,
  },
  selectedTab: {
    fontWeight: "bold",
  },
  tab: {
    margin: 0,
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 8,
  },
})
