import { getMessageOpenCalled } from '../../message-open-called/get-message-open-called'
import { FormattedMessageCalled } from '../formatted-message-called'
import { formattedDate } from '../formattedDate'
import { CheckIfTheCallIsAnEmergency } from './check-if-the-call-is-an-emergency'
import { CheckWithTheScopeOfTheTicket } from './check-with-the-scope-of-the-ticket'
import { GetDescription } from './get-description'
import { GetIdCalled } from './get-id-called'
import { GetIdFilial } from './get-id-filial'

interface FormattedEmailsProps {
  datas: any
  uid?: number
}

export async function FormattedEmails({ datas, uid }: FormattedEmailsProps) {
  const dateOpenRegex = /\d{2}\/\d{2}\/\d{4} \d{2}:\d{2} [A-Z]{3}/g
  const descriptionSummaryRegex = /Descrição Resumida:\s*(.*?)(?=<br>)/
  const callPriorityRegex = /Prioridade:\s*(.*?)(?=<br>)/

  const dataCalled: any = []

  // async function getAttachments(attachments) {
  //   const fs = require('fs')
  //   const path = require('path')

  //   for (const attachment of attachments) {
  //     if (attachment.contentDisposition === 'attachment') {
  //       const filePath = path.join('./tmp', attachment.filename)
  //       await fs.promises.writeFile(filePath, attachment.content)
  //     }
  //   }
  // }

  for await (const data of datas) {
    // await getAttachments(data.data.attachments)
    // // console.log(data.data)

    const getIdFilial = GetIdFilial(data.data.html)
    const getDescription = GetDescription(data.data.html)
    const getIdCalled = GetIdCalled(data.data.html)
    const callPriority = data.data.html.match(callPriorityRegex)

    const descriptionSummary = data.data.html.match(descriptionSummaryRegex)

    const [date] = data.data.html.match(dateOpenRegex)

    const dateFormatted = formattedDate(date)

    const contentMessage = await getMessageOpenCalled(data.data.html)

    if (!contentMessage) {
      return null
    }

    const checkIfTheCallIsAnEmergency = CheckIfTheCallIsAnEmergency(
      data.data.html,
    )
    const checkWithTheScopeOfTheTicket = CheckWithTheScopeOfTheTicket(
      data.data.html,
    )

    const formattedMessageCalled = await FormattedMessageCalled(contentMessage)
      .then((results) => {
        return results
      })
      .catch((error) => {
        console.error(error)
      })

    data.data.attachments.filter((res) => {
      return res.contentDisposition === 'attachment'
    })

    const dataChamado = {
      uid: data.uid,
      chamado: getIdCalled,
      filial: getIdFilial,
      callDate: data.data.date,
      description: getDescription,
      descriptionSummary: descriptionSummary[1],
      dataOpen: dateFormatted,
      emergency: checkIfTheCallIsAnEmergency,
      scope: checkWithTheScopeOfTheTicket,
      priority: callPriority[1].replace(/[-0-9]/g, '').trim(),
      messageCalled: formattedMessageCalled,
      // attachments: data.data.attachments,
    }

    dataCalled.push(dataChamado)
  }

  return dataCalled
}
