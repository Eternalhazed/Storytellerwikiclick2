"use client"

import NextImage from "next/image"
import { useApiClient } from "@/hooks/useApiClient"
import { useMemo, useRef, useState } from "react"
import { useForm } from "@mantine/form"
import {
  FileButton,
  Button,
  Tabs,
  Image,
  Group,
  Stack,
  TextInput,
  Text,
  Fieldset,
  ActionIcon,
  Checkbox,
  NumberInput,
  Combobox,
  useCombobox,
  InputBase,
  Autocomplete,
} from "@mantine/core"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import {
  AuthorRelation,
  CollectionRelation,
  SeriesRelation,
  TagRelation,
} from "@/database/books"
import { Status } from "@/database/statuses"
import { UUID } from "@/uuid"
import { useBook } from "./LiveBooksProvider"
import { Author } from "@/database/authors"
import { Series } from "@/database/series"

type Props = {
  bookUuid: UUID
  authors: Author[]
  statuses: Status[]
  series: Series[]
}

enum SaveState {
  CLEAN = "CLEAN",
  LOADING = "LOADING",
  SAVED = "SAVED",
  ERROR = "ERROR",
}

export function BookEditForm({ bookUuid, statuses, authors, series }: Props) {
  const client = useApiClient()
  const clearSavedTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const book = useBook(bookUuid, (update) => {
    form.setValues({
      title: update.title,
      language: update.language ?? "",
      authors: update.authors,
      series: update.series,
      statusUuid: update.statusUuid,
      collections: update.collections,
      publicationDate: update.publicationDate ?? "",
      rating: update.rating,
      description: update.description ?? "",
      narrator: update.narrator ?? "",
      tags: update.tags as TagRelation[],
      textCover: null,
      audioCover: null,
    })
  })!

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption()
    },
  })

  const form = useForm({
    initialValues: {
      title: book.title,
      language: book.language ?? "",
      authors: book.authors as AuthorRelation[],
      series: book.series as SeriesRelation[],
      statusUuid: book.statusUuid,
      collections: book.collections as CollectionRelation[],
      publicationDate: book.publicationDate ?? "",
      rating: book.rating,
      description: book.description ?? "",
      narrator: book.narrator ?? "",
      tags: book.tags as TagRelation[],
      textCover: null as File | null,
      audioCover: null as File | null,
    },
  })

  const {
    textCover,
    audioCover,
    authors: bookAuthors,
    series: bookSeries,
    collections,
    statusUuid,
  } = form.getValues()
  const textCoverUrl = useMemo(
    () =>
      textCover
        ? URL.createObjectURL(textCover)
        : client.getCoverUrl(book.uuid),
    [book.uuid, client, textCover],
  )
  const audioCoverUrl = useMemo(
    () =>
      audioCover
        ? URL.createObjectURL(audioCover)
        : client.getCoverUrl(book.uuid, true),
    [book.uuid, client, audioCover],
  )

  const [savedState, setSavedState] = useState<SaveState>(SaveState.CLEAN)

  return (
    <>
      {savedState === SaveState.ERROR && (
        <p>Failed to update. Check your server logs for details.</p>
      )}
      <form
        onSubmit={form.onSubmit(async (values) => {
          setSavedState(SaveState.LOADING)
          const { textCover, audioCover, ...update } = values
          try {
            await client.updateBook(
              {
                ...book,
                ...update,
              },
              textCover,
              audioCover,
            )
          } catch (_) {
            setSavedState(SaveState.ERROR)
            return
          }

          setSavedState(SaveState.SAVED)

          if (clearSavedTimeoutRef.current) {
            clearTimeout(clearSavedTimeoutRef.current)
          }
          clearSavedTimeoutRef.current = setTimeout(() => {
            setSavedState(SaveState.CLEAN)
          }, 2000)
        })}
      >
        <Combobox
          store={combobox}
          withinPortal={false}
          onOptionSubmit={(value) => {
            form.setFieldValue("statusUuid", value as UUID)
            combobox.closeDropdown()
          }}
        >
          <Combobox.Target>
            <InputBase
              className="w-48"
              component="button"
              type="button"
              pointer
              rightSection={<Combobox.Chevron />}
              onClick={() => {
                combobox.toggleDropdown()
              }}
              rightSectionPointerEvents="none"
            >
              <Group justify="space-between" wrap="nowrap">
                <Text>{statuses.find((s) => s.uuid === statusUuid)?.name}</Text>
              </Group>
            </InputBase>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {statuses.map((s) => (
                <Combobox.Option value={s.uuid} key={s.uuid}>
                  <Group justify="space-between" wrap="nowrap">
                    <Text>{s.name}</Text>
                  </Group>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <Group align="stretch" gap="xl" mt="lg">
          <Tabs defaultValue="text-cover">
            <Tabs.List>
              <Tabs.Tab value="text-cover">Text</Tabs.Tab>
              <Tabs.Tab value="audio-cover">Audio</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="text-cover">
              <FileButton
                accept="image/jpeg,image/png"
                {...form.getInputProps("textCover")}
              >
                {(props) => (
                  <Button
                    {...props}
                    variant="subtle"
                    className="flex h-[max-content] w-[max-content] justify-center"
                  >
                    <Image
                      component={NextImage}
                      height={98 * 3}
                      width={64 * 3}
                      h={98 * 3}
                      w={64 * 3}
                      src={textCoverUrl}
                      alt=""
                      aria-hidden
                    />
                    <Text
                      c="black"
                      className="absolute bottom-4 left-0 inline-block w-full bg-white bg-opacity-90 py-2"
                    >
                      Edit cover art
                    </Text>
                  </Button>
                )}
              </FileButton>
            </Tabs.Panel>
            <Tabs.Panel value="audio-cover">
              <FileButton
                accept="image/jpeg,image/png"
                {...form.getInputProps("audioCover")}
              >
                {(props) => (
                  <Button
                    {...props}
                    variant="subtle"
                    className="h-[max-content] w-[max-content]"
                    classNames={{
                      label: "flex justify-center bg-black",
                    }}
                  >
                    <Image
                      component={NextImage}
                      fit="contain"
                      height={64 * 3}
                      width={64 * 3}
                      h={64 * 3}
                      w={64 * 3}
                      src={audioCoverUrl}
                      alt=""
                      aria-hidden
                    />
                    <Text
                      c="black"
                      className="absolute bottom-4 left-0 inline-block w-full bg-white bg-opacity-90 py-2"
                    >
                      Edit cover art
                    </Text>
                  </Button>
                )}
              </FileButton>
            </Tabs.Panel>
          </Tabs>
          <Stack gap={0} className="grow">
            <TextInput label="Title" {...form.getInputProps("title")} />
            <TextInput label="Language" {...form.getInputProps("language")} />
            {bookAuthors.map((author, i) => (
              <Fieldset
                key={author.uuid ?? i}
                legend="Authors"
                className="relative"
              >
                <Autocomplete
                  label="Name"
                  data={authors.map((author) => author.name)}
                  {...form.getInputProps(`authors.${i}.name`)}
                />
                <TextInput
                  label="Role"
                  {...form.getInputProps(`authors.${i}.role`)}
                />
                {i > 0 && (
                  <ActionIcon
                    variant="subtle"
                    className="absolute right-4 top-0"
                    onClick={() => {
                      form.removeListItem("authors", i)
                    }}
                  >
                    <IconTrash color="red" />
                  </ActionIcon>
                )}
              </Fieldset>
            ))}
            <Button
              leftSection={<IconPlus />}
              variant="outline"
              mt="sm"
              className="self-start"
              onClick={() => {
                form.insertListItem("authors", {
                  name: "",
                  role: "Author",
                  fileAs: "",
                } satisfies AuthorRelation)
              }}
            >
              Add author
            </Button>
            {bookSeries.map((s, i) => (
              <Fieldset key={s.uuid ?? i} legend="Series" className="relative">
                <Autocomplete
                  label="Name"
                  data={series.map((s) => s.name)}
                  {...form.getInputProps(`series.${i}.name`)}
                />
                <Checkbox
                  label="Featured"
                  {...form.getInputProps(`series.${i}.featured`, {
                    type: "checkbox",
                  })}
                />
                <NumberInput
                  label="Position"
                  {...form.getInputProps(`series.${i}.position`)}
                />
                {i > 0 && (
                  <ActionIcon
                    variant="subtle"
                    className="absolute right-4 top-0"
                    onClick={() => {
                      form.removeListItem("seriess", i)
                    }}
                  >
                    <IconTrash color="red" />
                  </ActionIcon>
                )}
              </Fieldset>
            ))}
            <Button
              leftSection={<IconPlus />}
              variant="outline"
              mt="sm"
              className="self-start"
              onClick={() => {
                form.insertListItem("series", {
                  name: "",
                  featured: !bookSeries.length,
                  position: 1,
                } satisfies SeriesRelation)
              }}
            >
              Add series
            </Button>
            {collections.map((collection, i) => (
              <Fieldset
                key={collection.uuid ?? i}
                legend="Collections"
                className="relative"
              >
                <TextInput
                  label="Name"
                  {...form.getInputProps(`collections.${i}.name`)}
                />
                {i > 0 && (
                  <ActionIcon
                    variant="subtle"
                    className="absolute right-4 top-0"
                    onClick={() => {
                      form.removeListItem("collections", i)
                    }}
                  >
                    <IconTrash color="red" />
                  </ActionIcon>
                )}
              </Fieldset>
            ))}
            <Button
              leftSection={<IconPlus />}
              variant="outline"
              mt="sm"
              className="self-start"
              onClick={() => {
                form.insertListItem("collections", {
                  name: "",
                } satisfies CollectionRelation)
              }}
            >
              Add collection
            </Button>
          </Stack>
        </Group>

        <Group justify="flex-end" className="sticky bottom-0 z-10 bg-white p-6">
          <Button type="submit" disabled={savedState === SaveState.LOADING}>
            {savedState === SaveState.SAVED ? "Saved!" : "Update"}
          </Button>
        </Group>
      </form>
    </>
  )
}
