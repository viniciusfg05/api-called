import { formattedDate } from './formattedDate'
const dateOpenRegex = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} [A-Z]{3}/g
const nameRegex = /-(.+)/

export function FormattedMessageCalled(contentMessage: string[][] | any) {
  const contentMessageFormatted = Promise.all(
    contentMessage.map(async ([date, message]) => {
      // console.log(message)
      const getDateWithRegex = date.match(dateOpenRegex)
      const getNameWithRegex = date.match(nameRegex)
      if (!getDateWithRegex) {
        return null
      }

      const [getDate] = getDateWithRegex
      const dateFormatted = formattedDate(getDate)

      if (!getNameWithRegex) {
        return null
      }

      const data = {
        name: getNameWithRegex[1].trim(),
        date: dateFormatted,
        message,
      }

      return data
    }),
  )

  return contentMessageFormatted
}
