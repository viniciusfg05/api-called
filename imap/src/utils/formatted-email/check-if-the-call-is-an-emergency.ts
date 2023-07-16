import * as cheerio from 'cheerio'

export function CheckIfTheCallIsAnEmergency(html) {
  const $ = cheerio.load(html)

  let emergency = false

  $('td').each((index, element) => {
    const tdText = $(element).text().trim()
    if (tdText.includes('Este chamado é considerado emergencial')) {
      const nextTdText = $(element).next().text().trim()
      emergency = nextTdText.toLowerCase() === 'sim'
    }
  })

  return emergency
}
