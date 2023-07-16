import nodemailer from 'nodemailer'
import { accessTokenSerLimpa } from './google'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export async function CreateNodemailerTransporter(): Promise<
  nodemailer.Transporter<SMTPTransport.SentMessageInfo>
> {
  const { ID_CLIENT, ID_CLIENT_SECRET, accessToken, refresh_token, user } =
    await accessTokenSerLimpa()

  try {
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user, // Substitua com o seu próprio endereço de e-mail
        clientId: ID_CLIENT,
        clientSecret: ID_CLIENT_SECRET,
        refreshToken: refresh_token,
        accessToken,
      },
      secure: true, //
    })

    const statusTransporte = await transporter.verify()

    if (statusTransporte === true) {
      return transporter
    }

    throw new Error('Erro na conexão com transporter do nodemailer')
  } catch (err) {
    return err
  }
}
