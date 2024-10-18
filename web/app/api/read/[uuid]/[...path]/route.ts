import { withHasPermission } from "@/auth"
import { getEpubSyncedDirectory } from "@/process/processEpub"
import { UUID } from "@/uuid"
import { spawn } from "node:child_process"
import { lookup } from "mime-types"
import netstatCb, { Options, ParsedItem } from "node-netstat" // Credit: [Roket](https://www.npmjs.com/~roket84)

type Params = {
  uuid: UUID
  path: string[]
}

function netstat(
  opts: Options, // Credit: [vjpr](https://github.com/vjpr)
) {
  return new Promise<ParsedItem[]>((resolve, reject) => {
    const res: ParsedItem[] = []
    netstatCb(
      {
        ...opts,
        done: (err) => {
          if (err) {
            reject(new Error(err))
            return
          }
          resolve(res)
        },
      },
      (data) => {
        res.push(data)
      },
    )
    return res
  })
}

/**
 * Use the Readium RWP server to retrieve publication contents
 *
 * For each call, we spin up an rwp server, make a request, and
 * then kill the server. Kind if crazy, but saves us the trouble
 * of needing to integrate with a golang library. Plus, it starts
 * up _very_ quickly.
 */
async function rwp(uuid: UUID, path: string) {
  const process = spawn("rwp", [
    "serve",
    // Use port "0" to have the OS assign a random userland
    // port
    "-p",
    "0",
    getEpubSyncedDirectory(uuid),
  ])

  // Wait for the server to print that it's started listening
  // before we try to make a request
  await new Promise((resolve) => {
    process.stderr.once("data", resolve)
  })

  if (process.pid === undefined) {
    process.kill()
    throw new Error("Failed to start rwp server")
  }

  // Because we relied on a random port from the OS, we have
  // to scan for the port that this process is listening on
  const rwpPort = (
    await netstat({
      filter: { protocol: "tcp", pid: process.pid },
    })
  )[0]?.local.port

  if (rwpPort == null) {
    process.kill()
    throw new Error("Failed to find port for rwp server")
  }

  // We run RWP in the synced directory, which always has precisely
  // one EPUB file in it. The list.json response will have the correct
  // "path" (opaque id) to use when querying for that EPUB file.
  const listResponse = await fetch(`http://localhost:${rwpPort}/list.json`)
  const [{ path: rwpId }] = (await listResponse.json()) as [
    { filename: string; path: string },
  ]

  // Actually request the contents from rwp
  const rwpResponse = await fetch(
    `http://localhost:${rwpPort}/${rwpId}/${path}`,
  )
  const contents = await rwpResponse.arrayBuffer()

  // Kill the rwp server before returning
  process.kill()

  return contents
}

export const GET = withHasPermission<Params>("book_read")(async (
  _request,
  context,
) => {
  const { uuid, path: pathSegments } = context.params
  const path = pathSegments.join("/")

  const contents = await rwp(uuid, path)

  return new Response(contents, {
    status: 200,
    headers: { "Content-Type": lookup(path) || "text/plain" },
  })
})
