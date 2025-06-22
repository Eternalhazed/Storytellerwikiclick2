"use client"

import NextImage from "next/image"

import NextLink from "next/link"
import {
  MantineProvider,
  AppShell as MantineAppShell,
  AppShellHeader,
  AppShellNavbar,
  AppShellMain,
  createTheme,
  MantineColorsTuple,
  Burger,
  NavLink,
  Title,
  Anchor,
  Group,
  Fieldset,
  TextInput,
  NativeSelect,
  Text,
  Image,
  PasswordInput,
} from "@mantine/core"
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconUsers,
  IconHome,
  IconBooks,
} from "@tabler/icons-react"
import { ReactNode } from "react"
import { useDisclosure } from "@mantine/hooks"
import { usePathname } from "next/navigation"
import { useCurrentUser, usePermissions } from "@/contexts/UserPermissions"
import { LiveBooksProvider } from "./books/LiveBooksProvider"
import { CurrentBookProgress } from "./layout/CurrentBookProgress"
import { BookDetail } from "@/apiModels"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Collection } from "@/database/collections"

dayjs.extend(customParseFormat)

const stOrange: MantineColorsTuple = [
  "#fff1e7",
  "#fbe2d3",
  "#f6c2a5",
  "#f1a173",
  "#ed8449",
  "#eb722f",
  "#ea6920",
  "#d15815",
  "#ba4d0f",
  "#a34106",
]

const theme = createTheme({
  primaryColor: "st-orange",
  fontFamily: "var(--font-inter)",
  headings: {
    fontFamily: "var(--font-young-serif)",
  },
  colors: {
    "st-orange": stOrange,
  },
  components: {
    NavLink: NavLink.extend({
      classNames: {
        label: "text-base",
        root: "p-2 rounded-md",
      },
    }),
    AppShellMain: AppShellMain.extend({
      defaultProps: {
        className: "max-w-[1200px]",
      },
    }),
    AppShellHeader: AppShellHeader.extend({
      defaultProps: {
        className: "text-st-orange-50 py-4",
      },
    }),
    Burger: Burger.extend({
      defaultProps: {
        className: "pb-[0.625rem]",
      },
    }),
    Fieldset: Fieldset.extend({
      defaultProps: {
        className: "my-8",
        variant: "filled",
        classNames: {
          legend: "text-xl",
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        className: "my-4",
      },
      classNames: {
        description: "text-sm",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        className: "my-4",
      },
      classNames: {
        description: "text-sm",
      },
    }),
    NativeSelect: NativeSelect.extend({
      classNames: {
        description: "text-sm",
      },
    }),
  },
})

interface Props {
  version: string
  children: ReactNode
  books: BookDetail[]
  collections: Collection[]
}

export function AppShell({ children, version, books, collections }: Props) {
  const [opened, { close, toggle }] = useDisclosure(false)
  const pathname = usePathname()
  const currentUser = useCurrentUser()
  const permissions = usePermissions()

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <LiveBooksProvider initialBooks={books}>
        <MantineAppShell
          withBorder={false}
          header={{ height: 100 }}
          padding="md"
          navbar={{
            width: 300,
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
        >
          <AppShellHeader>
            <Group align="center">
              {currentUser && (
                <Burger
                  opened={opened}
                  color="st-orange"
                  onClick={toggle}
                  hiddenFrom="sm"
                  size="lg"
                />
              )}
              <Anchor component={NextLink} href="/">
                <Group>
                  <Image
                    component={NextImage}
                    h={80}
                    w={80}
                    height={80}
                    width={80}
                    src="/Storyteller_Logo.png"
                    alt=""
                    aria-hidden
                  />
                  <Title size="h1" className="text-black">
                    Storyteller
                  </Title>
                </Group>
              </Anchor>
            </Group>
          </AppShellHeader>
          {currentUser && (
            <AppShellNavbar>
              <Text c="black" my="sm" px="sm">
                Version: {version}
              </Text>
              <CurrentBookProgress />
              {permissions.bookCreate || permissions.bookList ? (
                <>
                  <NavLink
                    onClick={close}
                    component={NextLink}
                    href="/"
                    leftSection={<IconHome />}
                    label="Home"
                    active={pathname === "/"}
                  />
                  <Title
                    order={4}
                    className="flex items-center gap-2 px-2 py-2 font-sans text-base font-normal"
                  >
                    <IconBooks /> Collections
                  </Title>
                  <NavLink
                    className="pl-10"
                    onClick={close}
                    component={NextLink}
                    href={`/collections/none`}
                    label={<span className="italic">Uncollected</span>}
                    active={pathname === `/collections/none`}
                  />
                  {collections.map((collection) => (
                    <NavLink
                      className="pl-10"
                      key={collection.uuid}
                      onClick={close}
                      component={NextLink}
                      href={`/collections/${collection.uuid}`}
                      label={collection.name}
                      active={pathname === `/collections/${collection.uuid}`}
                    />
                  ))}
                </>
              ) : null}
              <NavLink
                onClick={close}
                component={NextLink}
                href="/account"
                leftSection={<IconUser />}
                label="Account"
                active={pathname === "/accounts"}
              />
              {permissions.userCreate || permissions.userList ? (
                <NavLink
                  onClick={close}
                  component={NextLink}
                  href="/users"
                  leftSection={<IconUsers />}
                  label="Users"
                  active={pathname === "/users"}
                />
              ) : null}
              {permissions.settingsUpdate ? (
                <NavLink
                  onClick={close}
                  component={NextLink}
                  href="/settings"
                  leftSection={<IconSettings />}
                  label="Settings"
                  active={pathname === "/settings"}
                />
              ) : null}
              <NavLink
                onClick={close}
                component="a"
                href="/logout"
                leftSection={<IconLogout />}
                label="Logout"
                active={pathname === "/logout"}
              />
            </AppShellNavbar>
          )}
          <AppShellMain className="*:ml-8">{children}</AppShellMain>
        </MantineAppShell>
      </LiveBooksProvider>
    </MantineProvider>
  )
}
