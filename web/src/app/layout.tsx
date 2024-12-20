import { Inter, Young_Serif } from "next/font/google"

import { ApiHostContextProvider } from "@/contexts/ApiHostContext"
import "./globals.css"
import { proxyRootPath } from "./apiHost"
// import { Header } from "@/components/layout/Header"
import {
  EMPTY_PERMISSIONS as EMPTY_PERMISSIONS,
  UserPermissionsProvider,
} from "@/contexts/UserPermissions"
import { createAuthedApiClient } from "@/authedApiClient"
import { User } from "@/apiModels"
import { ApiClientError } from "@/apiClient"
import { logger } from "@/logging"
import { AppShell } from "@/components/AppShell"
import { ColorSchemeScript } from "@mantine/core"
import "@mantine/core/styles.css"

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

  let currentUser: User | undefined = undefined
  try {
    const client = await createAuthedApiClient()
    currentUser = await client.getCurrentUser()
  } catch (e) {
    if (e instanceof ApiClientError && e.statusCode >= 500) logger.error(e)
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.className + " " + youngSerif.className}
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
