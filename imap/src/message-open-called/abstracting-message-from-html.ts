import { removerTagsWithRegex } from '../utils/removeTagsWithRegex'

export function abstractingMessageFromHtml(
  getMessageOpenChamado: Promise<(string | null)[]>,
): Promise<String[][] | void> {
  const contentMessage = getMessageOpenChamado
    .then((results) => {
      const regex =
        /<span[^>]*>([\s\S]*?)<\/span>|<strong[^>]*>([\s\S]*?)<\/strong>/g

      const contentMessage = results.toString().match(regex)

      if (!contentMessage) {
        return []
      }

      const contentMessageFormatted = removerTagsWithRegex(contentMessage)

      const pairs: string[][] = []

      for (let i = 0; i < contentMessageFormatted.length; i += 2) {
        const pair = [
          contentMessageFormatted[i],
          contentMessageFormatted[i + 1],
        ]

        pairs.push(pair)
      }

      return pairs
    })
    .catch((err) => {
      return err
    })
    .then()

  return contentMessage
}
