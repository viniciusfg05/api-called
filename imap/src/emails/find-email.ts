import { ImapSimpleOptions, Message, connect } from 'imap-simple'

interface AnswerEmailProps {
  config: ImapSimpleOptions
  subject: string
}

export async function FindEmail({
  config,
  subject,
}: AnswerEmailProps): Promise<Message> {
  return new Promise((resolve, reject) => {
    connect(config).then(async function (connection) {
      await connection.openBox('INBOX').then(async () => {
        const searchCriteria = [['SUBJECT', `${subject}`]]
        const fetchOptions = {
          bodies: ['HEADER', 'TEXT', ''],
          struct: true,
          markSeen: false,
        }

        const messages = await connection.search(searchCriteria, fetchOptions)

        try {
          if (!messages) {
            reject(new Error('Nenhum email encontrado'))
          }

          function GetMostRecentEmail(objects: Message[]) {
            return objects.reduce(
              (mostRecentObject: Message, currentObject: Message) => {
                if (
                  !mostRecentObject ||
                  currentObject.attributes.date >
                    mostRecentObject.attributes.date
                ) {
                  return currentObject
                }
                return mostRecentObject
              },
              null as unknown as Message,
            )
          }

          const getMostRecentEmail = GetMostRecentEmail(messages)

          resolve(getMostRecentEmail)
        } catch (err) {
          reject(err)
        }
      })
    })
  })
}
