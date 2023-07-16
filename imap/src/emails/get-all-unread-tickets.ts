import { ImapSimpleOptions, connect } from 'imap-simple'
import { simpleParser, ParsedEmail } from 'mailparser'
import _ from 'lodash'

interface GetAllUnreadTicketsProps {
  config: ImapSimpleOptions
}

export async function GetAllUnreadTickets({
  config,
}: GetAllUnreadTicketsProps): Promise<ParsedEmail[]> {
  return new Promise((resolve, reject) => {
    try {
      connect(config).then(async (connection) => {
        await connection.openBox('INBOX').then(async () => {
          const searchCriteria = [
            'UNSEEN',
            ['FROM', 'centrord@service-now.com'],
          ]
          const fetchOptions = { bodies: '', markSeen: false, struct: true }

          const messages = await connection.search(searchCriteria, fetchOptions)
          const emailPromises: Promise<ParsedEmail>[] = []

          if (messages.length === 0) {
            throw new Error('Nenhuma chamado aberto')
          }

          for (const item of messages) {
            const uid = item.attributes.uid
            const all = _.find(item.parts, { which: '' })
            const fullBody = `Imap-Id: ${uid}\r\n${all.body}`

            const emailPromise = new Promise<ParsedEmail>((resolve, reject) => {
              try {
                const data = new Promise<ParsedEmail>((resolve, reject) => {
                  simpleParser(fullBody, (err, data) => {
                    if (err) reject(err)
                    resolve({ data, uid })
                  })
                })

                resolve(data)
              } catch (err) {
                reject(err)
              }
            })

            emailPromises.push(await emailPromise)
          }

          connection.end()
          Promise.all(emailPromises)
            .then((emails) => {
              resolve(emails) // Resolve a promessa com todos os dados dos emails
            })
            .catch((err) => reject(err))
        })
      })
    } catch (error) {
      // console.error("Erro ao se conectar", error);
      reject(error)
    }
  })
}
