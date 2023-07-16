import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export function formattedDate(date: string) {
  const convertUTC = date.replace('BRT', '').trim()
  const substituirBarraPorHifen = convertUTC.replace(/\//g, '-')

  const [day, month, year, hours] = substituirBarraPorHifen.split(/-|\s/)
  const invertDate = `${year}-${month}-${day} ${hours}`
  const convertISO = dayjs(invertDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')

  return convertISO
}
