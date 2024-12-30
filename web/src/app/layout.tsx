import { Inter, Young_Serif } from "next/font/google"

import { ApiHostContextProvider } from "@/contexts/ApiHostContext"
import { proxyRootPath } from "./apiHost"
// import { Header } from "@/components/layout/Header"
import {
  EMPTY_PERMISSIONS as EMPTY_PERMISSIONS,
  UserPermissionsProvider,
} from "@/contexts/UserPermissions"
import { getCurrentUser } from "@/authedApiClient"
import { AppShell } from "@/components/AppShell"
import { ColorSchemeScript } from "@mantine/core"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const youngSerif = Young_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-young-serif",
})

export const metadata = {
  title: "Storyteller",
  description: "A simple tool for syncing audiobooks and ebooks",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const versionString = process.env["CI_COMMIT_TAG"]
  const version = versionString?.match(/^web-v(.*)$/)?.[1] ?? "development"

  const currentUser = await getCurrentUser()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.variable + " " + youngSerif.variable}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning>
        <ApiHostContextProvider value={{ rootPath: proxyRootPath }}>
          <UserPermissionsProvider
            value={currentUser?.permissions ?? EMPTY_PERMISSIONS}
          >
            <AppShell version={version}>{children}</AppShell>
          </UserPermissionsProvider>
        </ApiHostContextProvider>
      </body>
    </html>
  )
}
