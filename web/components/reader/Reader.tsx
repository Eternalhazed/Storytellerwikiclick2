"use client"

import { UUID } from "@/uuid"
import { type EpubNavigator } from "@readium/navigator"
import { HttpFetcher, Link, Manifest, Publication } from "@readium/shared"
import { useEffect, useRef, useState } from "react"
import styles from "./reader.module.css"
import "./reader.css"

type Props = {
  uuid: UUID
}

export function Reader({ uuid }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [, setNavigator] = useState<EpubNavigator | null>(null)

  useEffect(() => {
    async function loadPublication() {
      const { EpubNavigator } = await import("@readium/navigator")
      const container = containerRef.current
      if (!container) return
      const currentUrl = new URL(window.location.href)
      const publicationUrl = new URL(
        `/api/read/${uuid}/manifest.json`,
        currentUrl.origin,
      )

      const fetcher = new HttpFetcher(undefined, publicationUrl.toString())
      const manifestLink = new Link({ href: "manifest.json" })

      const fetched = fetcher.get(manifestLink)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const selfLink = (await fetched.link()).toURL(publicationUrl.toString())!
      const response = await fetched.readAsJSON()

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const manifest = Manifest.deserialize(response as string)!
      manifest.setSelfLink(selfLink)
      const publication = new Publication({
        manifest: manifest,
        fetcher: fetcher,
      })
      const navigator = new EpubNavigator(container, publication, {})
      setNavigator(navigator)
      await navigator.load()
    }
    void loadPublication()
  }, [uuid])

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]} ref={containerRef}></div>
    </div>
  )
}
