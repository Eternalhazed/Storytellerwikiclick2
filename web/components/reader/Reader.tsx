"use client"

import { UUID } from "@/uuid"
import { HttpFetcher, Link, Manifest, Publication } from "@readium/shared"
import { useEffect, useRef } from "react"
import styles from "./reader.module.css"
import "./reader.css"
import { useApiClient } from "@/hooks/useApiClient"
import { type EpubNavigator } from "@readium/navigator"

type Props = {
  uuid: UUID
}

export function Reader({ uuid }: Props) {
  const apiClient = useApiClient()
  const containerRef = useRef<HTMLDivElement | null>(null)
  // const [, setNavigator] = useState<EpubNavigator | null>(null)

  useEffect(() => {
    let navigator: EpubNavigator | null = null
    const abortController = new AbortController()
    async function loadPublication() {
      const { EpubNavigator } = await import("@readium/navigator")
      if (abortController.signal.aborted) {
        return
      }
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
      // signal.aborted is mutable, so it may have changed since we last checked
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (abortController.signal.aborted) {
        return
      }
      const response = await fetched.readAsJSON()
      // signal.aborted is mutable, so it may have changed since we last checked
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (abortController.signal.aborted) {
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const manifest = Manifest.deserialize(response as string)!
      manifest.setSelfLink(selfLink)
      const publication = new Publication({
        manifest: manifest,
        fetcher: fetcher,
      })
      navigator = new EpubNavigator(container, publication, {
        frameLoaded() {},
        positionChanged(locator) {
          void apiClient.syncPosition(uuid, locator, Date.now())
          window.focus()
        },
        tap() {
          return false
        },
        click() {
          return false
        },
        zoom() {},
        miscPointer() {},
        customEvent() {},
        handleLocator(locator) {
          const href = locator.href
          if (
            href.startsWith("http://") ||
            href.startsWith("https://") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
          ) {
            if (confirm(`Open "${href}" ?`)) window.open(href, "_blank")
          } else {
            console.warn("Unhandled locator", locator)
          }
          return false
        },
        textSelected(selection) {
          console.log("selection", selection)
        },
      })
      // setNavigator(navigator)
      await navigator.load()
      // signal.aborted is mutable, so it may have changed since we last checked
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (abortController.signal.aborted) {
        await navigator.destroy()
        return
      }
    }
    void loadPublication()
    return () => {
      abortController.abort()
      void navigator?.destroy()
    }
  }, [apiClient, uuid])

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["container"]} ref={containerRef}></div>
    </div>
  )
}
