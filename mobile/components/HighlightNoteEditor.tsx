import { useCallback, useEffect, useState } from "react"
import { Button, Label, XStack, YStack, Sheet, TextArea } from "tamagui"
import { useAppDispatch } from "../store/appState"
import { bookshelfSlice } from "../store/slices/bookshelfSlice"
import type { UUID } from "crypto"

type Props = {
  bookId: number
  highlightId: UUID
  initialNote?: string | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
}

function saveNoteAction(bookId: number, highlightId: UUID, note: string) {
  if (note.trim().length > 0) {
    return bookshelfSlice.actions.highlightNoteAdded({
      bookId,
      highlightId,
      note: note.trim()
    })
  } else {
    return bookshelfSlice.actions.highlightNoteRemoved({
      bookId,
      highlightId
    })
  }
}

export function HighlightNoteEditor({
                                      bookId,
                                      highlightId,
                                      initialNote = "",
                                      open,
                                      onOpenChange
                                    }: Props) {
  const [note, setNote] = useState(initialNote)
  const [lastSavedNote, setLastSavedNote] = useState(initialNote)
  const [savedShown, setSavedShown] = useState(false)
  const dispatch = useAppDispatch()

  const saveNote = useCallback((note: string) => {
    dispatch(saveNoteAction(bookId, highlightId, note))
  }, [bookId, highlightId, dispatch])

  // Save note with debounce
  useEffect(() => {
    if (note === lastSavedNote) return

    const timer = setTimeout(() => {
      saveNote(note)
      setLastSavedNote(note)
      setSavedShown(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [note, lastSavedNote, saveNote])

  useEffect(() => {
    if (!savedShown) return

    const timer = setTimeout(() => {
      setSavedShown(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [savedShown, lastSavedNote])

  const handleDiscard = useCallback(() => {
    dispatch(saveNoteAction(bookId, highlightId, initialNote))
    onOpenChange(false)
  }, [dispatch, bookId, highlightId, initialNote, onOpenChange])

  const handleDone = useCallback(() => {
    dispatch(saveNoteAction(bookId, highlightId, note))
    onOpenChange(false)
  }, [dispatch, bookId, highlightId, note, onOpenChange])

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[50]}
      dismissOnSnapToBottom
      animation="medium"
    >
      <Sheet.Overlay
        animation="lazy"
        backgroundColor="$shadow6"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame padding="$4" f={1} marginBottom="$6">
        <YStack f={1} gap="$3">
          <XStack>
            <Label size="$3" f={1} htmlFor="highlight-note">
              Note {savedShown ? "Saved!" : ""}
            </Label>
            <XStack gap="$2" justifyContent="flex-end">
              <Button
                size="$3"
                variant="outlined"
                onPress={handleDiscard}
                backgroundColor="$background"
              >
                Discard
              </Button>
              <Button
                size="$3"
                onPress={handleDone}
              >
                Done
              </Button>
            </XStack>
          </XStack>
          <TextArea
            f={1}
            id="highlight-note"
            placeholder="Add a note..."
            value={note}
            onChangeText={setNote}
            autoFocus
          />
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}
