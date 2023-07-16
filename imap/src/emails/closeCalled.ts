import { ImapSimpleOptions, connect } from 'imap-simple'
import { simpleParser } from 'mailparser'
import _ from 'lodash'
import { formattedDateDayJS } from '../utils/formatted-date'
import { CreateNodemailerTransporter } from '../lib/nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

interface AnswerEmailProps {
  config: ImapSimpleOptions
  subject: string
  uidEmail: number
  answer: string
}

export async function CloseCalled({
  config,
  subject,
  uidEmail,
  answer,
}: AnswerEmailProps) {
  const createNodemailerTransporter = await CreateNodemailerTransporter()

  return new Promise((resolve, reject) => {
    connect(config).then(async function (connection) {
      await connection.openBox('INBOX').then(async () => {
        const searchCriteria = [['UID', uidEmail.toString()]]
        const fetchOptions = { bodies: ['HEADER', 'TEXT', ''] }

        const [result] = await connection.search(searchCriteria, fetchOptions)

        const dateToEmail = await formattedDateDayJS(
          result.attributes.date.toString(),
        )

        const uid = result.attributes.uid
        const all = _.find(result.parts, { which: '' })
        const fullBody = `Imap-Id: ${uid}\r\n${all.body}`

        await simpleParser(fullBody, async (err, data) => {
          if (!err) {
            reject(new Error(err))
          }

          // console.log(data)
          const message = {
            from: result,
            to: result.parts[2].body.from,
            subject: `Re: ${result.parts[2].body.subject} - CHAMADO RESOLVIDO`,
            html: `<!doctype html>
              <html ⚡4email>
                <head>
                  <meta charset="utf-8">

                </head>
                <body>
                  <div>
                    <p>${answer}</p>
                  </div>
                  <br>
                  <br>
                  <br>
                  <blockquote>
                    <p>Em ${dateToEmail}, <a href="mailto:${data.from.value[0].address}">${data.from.value[0].address}</a> escreveu:</p>
                    <br>
                    <p>${data.html}<p/>
                  </blockquote>
                </body>
              </html>`,
            attachments: [
              {
                path: ``,
              },
            ],
          }

          function sendEmails({
            sendEmailsObject,
          }): Promise<SMTPTransport.SentMessageInfo> {
            return new Promise((resolve, reject) => {
              createNodemailerTransporter
                .sendMail(sendEmailsObject)
                .then((info) => {
                  resolve(info)
                })
                .catch((err) => {
                  connection.end()
                  reject(new Error(`${err}`))
                })
            })
          }

          await sendEmails({ sendEmailsObject: message }).then((response) => {
            connection.addFlags(result.attributes.uid, 'Answered', (err) => {
              err && console.log(err)
              connection.end()
            })

            if (response.messageId) {
              resolve(
                new Error(
                  `Email enviado com sucesso para ${response.accepted}`,
                ),
              )
            }

            reject(
              new Error(`Não foi possível enviar email, Erro: ${response} `),
            )
          })
        })
      })
    })
  })
}
