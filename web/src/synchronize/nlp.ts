import wink from "wink-nlp"
import model from "wink-eng-lite-web-model"
import { exec } from "node:child_process"
import { logger } from "@/logging"
import { Readable } from "node:stream"

const nlp = wink(model)
const { its, as } = nlp

export async function tokenizeSentences(text: string) {
  const process = exec("python sentence_segment.py")
  let stdout = ""
  let stderr = ""
  process.stdout?.on("data", (chunk: string) => {
    stdout += chunk
  })
  process.stderr?.on("data", (chunk: string) => {
    stderr += chunk
  })
  const stdin = new Readable()
  stdin.push(text)
  stdin.push(null)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  stdin.pipe(process.stdin!)
  try {
    await new Promise<void>((resolve, reject) => {
      process.on("exit", (code) => {
        if (code === 0) {
          resolve()
          return
        }
        reject(new Error(`Process failed with exit code: ${code}`))
      })
      process.on("error", reject)
    })
  } catch (e) {
    logger.error(e)
    logger.info(stdout)
    throw new Error(stderr)
  }
  const result = JSON.parse(stdout) as string[]
  return result
}

export function bagOfWords(text: string) {
  const nlpDoc = nlp.readDoc(text)
  const words = nlpDoc
    .tokens()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    .filter((token) => token.out(its.type) === "word")
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return words.out(its.normal, as.unique)
}
