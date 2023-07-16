import { GetAllUnreadTickets } from './src/emails/get-all-unread-tickets'
import { FormattedEmails } from './src/utils/formatted-email'
import { ImapConfig } from './src/lib/node-imap'
;(async () => {
  await ImapConfig({ connectTo: 'atendimentoDF' }).then(async (config) => {
    const getEmail = await GetAllUnreadTickets({ config })
      .then(async (getEmail) => {
        const formattedEmails = await FormattedEmails({ datas: getEmail })
        return formattedEmails
      })
      .catch((err) => {
        console.log(err)
      })

    console.log(JSON.stringify(getEmail, null, 2))

    // const res = await FindEmail({config, subject: 'test'})
    // const tee = await CloseCalled({config, subject: 'test', answer: "RESPOSTA 19/06", uidEmail: res.attributes.uid})
  })
})()
