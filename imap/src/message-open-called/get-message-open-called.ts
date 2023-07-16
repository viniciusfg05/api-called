import * as cheerio from 'cheerio'
import { abstractingMessageFromHtml } from '../message-open-called/abstracting-message-from-html'

export async function getMessageOpenCalled(htmlFromEmail: string) {
  const query = ' Anotações de Trabalho'

  const $ = cheerio.load(htmlFromEmail)

  const searchedForTheDivThatContains = $('div')
    .filter((_, el) => $(el).find('sup').text() === query)
    .first()

  const lookingForTheDivWithTheReopeningMessages = searchedForTheDivThatContains
    .nextAll('div')
    .addBack()
    .toArray()

  const getMessageOpenChamado = Promise.all(
    lookingForTheDivWithTheReopeningMessages.map(async (div) => {
      const messageMatch = $(div).find('strong span').html()

      return messageMatch
    }),
  )

  if (!getMessageOpenCalled) {
    return null
  }

  const contentMessage = abstractingMessageFromHtml(getMessageOpenChamado)

  return contentMessage
}
