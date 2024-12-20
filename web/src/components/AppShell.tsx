"use client"

import Image from "next/image"

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
} from "@mantine/core"
import { ReactNode } from "react"
import { useDisclosure } from "@mantine/hooks"
import { usePathname } from "next/navigation"

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
})

interface Props {
  version: string
  children: ReactNode
}

export function AppShell({ children }: Props) {
  const [opened, { toggle }] = useDisclosure(false)
  const pathname = usePathname()

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <MantineAppShell
        withBorder={false}
        header={{ height: 60 }}
        {...(pathname === "/"
          ? undefined
          : {
              navbar: {
                width: 240,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
              },
            })}
      >
        <AppShellHeader className="text-st-orange-50 p-4">
          <Group align="center">
            <Burger
              className="pb-[0.625rem]"
              opened={opened}
              color="white"
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Anchor component={NextLink} href="/" className="block">
              <Image
                height={80}
                width={80}
                src="/Storyteller_Logo.png"
                alt=""
                aria-hidden
              />
              <Title size="h1" className="text-black">
                Storyteller
              </Title>
            </Anchor>
          </Group>
        </AppShellHeader>
        <AppShellNavbar className="mt-8">
          <NavLink
            component={NextLink}
            href="/"
            label="Books"
            active={pathname === "/"}
          />
          <NavLink
            component={NextLink}
            href="/users"
            label="Users"
            active={pathname === "/users"}
          />
          <NavLink
            component={NextLink}
            href="/settings"
            label="Settings"
            active={pathname === "/settings"}
          />
          <NavLink
            component="a"
            href="/logout"
            label="Logout"
            active={pathname === "/logout"}
          />
        </AppShellNavbar>
        <AppShellMain className="mt-8">{children}</AppShellMain>
      </MantineAppShell>
    </MantineProvider>
  )
}
