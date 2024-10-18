import styles from "./layout.module.css"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"

export const metadata = {
  title: "Storyteller",
  description: "A simple tool for syncing audiobooks and ebooks",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const versionString = process.env["CI_COMMIT_TAG"]
  const version = versionString?.match(/^web-v(.*)$/)?.[1] ?? "development"

  return (
    <html lang="en">
      <body>
        <Header version={version} />
        <div className={styles["container"]}>
          <Sidebar className={styles["sidebar"]} version={version} />
          {children}
        </div>
      </body>
    </html>
  )
}
