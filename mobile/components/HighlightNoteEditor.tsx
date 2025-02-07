import { useState } from "react"
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

export function HighlightNoteEditor({
  bookId,
  highlightId,
  initialNote = "",
  open,
  onOpenChange,
}: Props) {
  const [note, setNote] = useState(initialNote)
  const dispatch = useAppDispatch()

  const handleSave = () => {
    if (note.trim()) {
      dispatch(
        bookshelfSlice.actions.highlightNoteAdded({
          bookId,
          highlightId,
          note: note.trim(),
        }),
      )
    } else {
      dispatch(
        bookshelfSlice.actions.highlightNoteRemoved({
          bookId,
          highlightId,
        }),
      )
    }
    onOpenChange(false)
  }

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
              Note
            </Label>
            <XStack gap="$2" justifyContent="flex-end">
              <Button
                size="$3"
                variant="outlined"
                onPress={() => onOpenChange(false)}
                backgroundColor="$background"
              >
                Cancel
              </Button>
              <Button size="$3" onPress={handleSave}>
                Save
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
