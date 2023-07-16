import * as cheerio from 'cheerio'

export function CheckWithTheScopeOfTheTicket(html) {
  const $ = cheerio.load(html)

  let data = ''

  $('td').each((index, element) => {
    const tdText = $(element).text().trim()
    if (tdText.includes('O escopo do chamado é classificado em')) {
      const nextTdText = $(element).next().text().trim()
      data = nextTdText == null ? '' : nextTdText
    }
  })

  return data
}
