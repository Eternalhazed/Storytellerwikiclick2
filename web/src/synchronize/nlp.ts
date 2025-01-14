import wink from "wink-nlp"
import model from "wink-eng-lite-web-model"

const nlp = wink(model)
const { its, as } = nlp

export function tokenizeSentences(text: string, locale: Intl.Locale) {
  const segmenter = new Intl.Segmenter(locale, { granularity: "sentence" })
  const segments = segmenter.segment(text)
  return Array.from(segments).map((s) => s.segment)
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
