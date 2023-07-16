import 'dayjs/locale/pt-br' // import locale
import dayjs from 'dayjs'
const localizedFormat = require('dayjs/plugin/localizedFormat')
const weekday = require('dayjs/plugin/weekday')

dayjs.extend(localizedFormat)
dayjs.extend(weekday)

dayjs.locale('pt-br')

export async function formattedDateDayJS(date: string) {
  const formattedDate = dayjs(date).format(
    'ddd., D [de] MMM. [de] YYYY [às] HH:mm',
  )

  return formattedDate
}
