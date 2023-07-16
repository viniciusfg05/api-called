import { GetAllUnreadTickets } from './emails/get-all-unread-tickets';
import { ImapConfig } from './lib/node-imap';
import { FormattedEmails } from './utils/formatted-email';

(async () => {
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
