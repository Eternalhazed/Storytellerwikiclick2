import { Image, Pressable } from "react-native"
import {
  getLocalAudioBookCoverUrl,
  getLocalBookCoverUrl,
} from "../store/persistence/files"
import { ProgressBar } from "./ProgressBar"
import { PlayPause } from "./PlayPause"
import {
  BookshelfBook,
  bookshelfSlice,
  playerPositionSeeked,
  playerTotalPositionSeeked,
} from "../store/slices/bookshelfSlice"
import { debounce, SizableText, View } from "tamagui"
import { useEffect, useMemo, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store/appState"
import { formatTime, useAudioBook } from "../hooks/useAudioBook"
import { preferencesSlice } from "../store/slices/preferencesSlice"
import { getBookPreferences } from "../store/selectors/preferencesSelectors"
import { getLocator } from "../store/selectors/bookshelfSelectors"
import { isSameChapter } from "../links"

type Props = {
  book: BookshelfBook
}

export function MiniPlayer({ book }: Props) {
  const locator = useAppSelector((state) => getLocator(state, book.id))
  const bookPrefs = useAppSelector((state) =>
    getBookPreferences(state, book.id),
  )
  const { isPlaying, isLoading, track, total } = useAudioBook()

  const dispatch = useAppDispatch()
  const [eagerProgress, setEagerProgress] = useState(track.position)

  const syncEagerProgress = useMemo(() => {
    return debounce(() => {
      setEagerProgress(positionRef.current)
    }, 200)
  }, [])

  useEffect(() => {
    syncEagerProgress()
    return () => {
      syncEagerProgress.cancel()
    }
  }, [total.position, track.position, locator, syncEagerProgress])

  useEffect(() => {
    setEagerProgress(positionRef.current)
  }, [bookPrefs?.detailView?.scope, bookPrefs?.detailView?.mode])

  const chapterTitle = useMemo(() => {
    return book.manifest.toc?.find((link) =>
      isSameChapter(link.href, locator?.locator.href ?? ""),
    )?.title
  }, [book.manifest.toc, locator?.locator.href])

  const chapterPositions = useMemo(() => {
    return book.positions.filter(
      (position) => position.href === locator?.locator.href,
    )
  }, [book.positions, locator?.locator.href])

  const positionRef = useRef(total.position)
  positionRef.current = useMemo(
    () =>
      bookPrefs?.detailView?.mode === "audio"
        ? bookPrefs?.detailView?.scope === "book"
          ? total.position
          : track.position
        : bookPrefs?.detailView?.scope === "book"
          ? locator?.locator.locations?.position ??
            (book.positions.findIndex(
              (position) =>
                (position.locations?.totalProgression ?? 0) >=
                (locator?.locator.locations?.totalProgression ?? 0),
            ) ?? 0)
          : (chapterPositions.findIndex(
              (position) =>
                (position.locations?.progression ?? 0) >=
                (locator?.locator.locations?.progression ?? 0),
            ) ?? 0),
    [
      book.positions,
      bookPrefs?.detailView?.mode,
      bookPrefs?.detailView?.scope,
      chapterPositions,
      locator?.locator.locations?.position,
      locator?.locator.locations?.progression,
      locator?.locator.locations?.totalProgression,
      total.position,
      track.position,
    ],
  )

  const formattedEagerProgress = useMemo(() => {
    return formatTime(eagerProgress)
  }, [eagerProgress])

  const { title, formattedProgress } = useMemo(() => {
    if (bookPrefs?.detailView?.mode === "audio") {
      if (bookPrefs.detailView.scope === "book") {
        return {
          title: book.title,
          formattedProgress: `${formattedEagerProgress} / ${total.formattedEndPosition}`,
        }
      }
      return {
        title: `Track ${track.index} of ${total.trackCount}`,
        formattedProgress: `${formattedEagerProgress} / ${track.formattedEndPosition}`,
      }
    }
    if (bookPrefs?.detailView?.scope === "book") {
      const position =
        locator?.locator.locations?.position ??
        (book.positions.findIndex(
          (position) =>
            (position.locations?.totalProgression ?? 0) >=
            (locator?.locator.locations?.totalProgression ?? 0),
        ) ?? 0) + 1
      return {
        title: book.title,
        formattedProgress: `pg. ${position} / ${book.positions.length}`,
      }
    }
    const chapterPosition =
      (chapterPositions.findIndex(
        (position) =>
          (position.locations?.progression ?? 0) >=
          (locator?.locator.locations?.progression ?? 0),
      ) ?? 0) + 1
    return {
      title: chapterTitle,
      formattedProgress: `pg. ${chapterPosition} / ${chapterPositions.length}`,
    }
  }, [
    bookPrefs?.detailView?.mode,
    bookPrefs?.detailView?.scope,
    locator?.locator.locations?.position,
    locator?.locator.locations?.totalProgression,
    locator?.locator.locations?.progression,
    chapterTitle,
    total.formattedEndPosition,
    total.trackCount,
    track.index,
    track.formattedEndPosition,
    formattedEagerProgress,
    book.title,
    book.positions,
    chapterPositions,
  ])

  const progressStart =
    bookPrefs?.detailView?.mode === "audio"
      ? bookPrefs?.detailView?.scope === "book"
        ? total.startPosition
        : track.startPosition
      : 1

  const progressEnd =
    bookPrefs?.detailView?.mode === "audio"
      ? bookPrefs?.detailView?.scope === "book"
        ? total.endPosition
        : track.endPosition
      : bookPrefs?.detailView?.scope === "book"
        ? book.positions.length
        : chapterPositions.length

  return (
    book &&
    bookPrefs && (
      <View position="absolute" left={12} right={12} bottom={32} zIndex={3}>
        <ProgressBar
          start={progressStart}
          stop={progressEnd}
          disabled={bookPrefs?.detailView?.scope === "book"}
          progress={eagerProgress}
          onProgressChange={(value) => {
            setEagerProgress(value)
            if (bookPrefs?.detailView?.mode === "audio") {
              if (bookPrefs?.detailView?.scope === "book") {
                dispatch(playerTotalPositionSeeked({ progress: value }))
              } else {
                dispatch(playerPositionSeeked({ progress: value }))
              }
            } else {
              const nextLocator = chapterPositions[value - 1]
              if (nextLocator === undefined) return
              dispatch(
                bookshelfSlice.actions.bookRelocated({
                  bookId: book.id,
                  locator: { locator: nextLocator, timestamp: Date.now() },
                }),
              )
            }
          }}
        />

        <View
          py={15}
          pl={15}
          pr="$4"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="$3"
        >
          <Pressable
            style={{
              width: 40,
            }}
            onPress={() => {
              dispatch(
                preferencesSlice.actions.bookDetailImagePressed({
                  bookId: book.id,
                }),
              )
            }}
          >
            <Image
              style={{
                margin: "auto",
                height: 40,
                width: bookPrefs.detailView?.mode === "audio" ? 40 : 26,
                borderRadius: 4,
              }}
              source={{
                uri:
                  bookPrefs.detailView?.mode === "audio"
                    ? getLocalAudioBookCoverUrl(book.id)
                    : getLocalBookCoverUrl(book.id),
              }}
            />
          </Pressable>
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={() => {
              dispatch(
                preferencesSlice.actions.bookDetailPositionPressed({
                  bookId: book.id,
                }),
              )
            }}
          >
            <SizableText size="$3" fontWeight={600} numberOfLines={1}>
              {title}
            </SizableText>
            <SizableText size="$3" numberOfLines={1}>
              {formattedProgress}
            </SizableText>
          </Pressable>
          <PlayPause isPlaying={isPlaying} isLoading={isLoading} />
        </View>
      </View>
    )
  )
}
