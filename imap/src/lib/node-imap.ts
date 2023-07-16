import { accessTokenCalledDF, accessTokenSerLimpa } from './google'
import xoauth2 from 'xoauth2'
import { ImapSimpleOptions } from 'imap-simple'

// export const imapConfig = {
//   // user: "atendimentodf@serlimpa.com.br",
//   user: "testchamados@gmail.com",
//   password: "Serlimpa123",
//   host: "imap.gmail.com",
//   port: 993,
//   tls: true,
//   tlsOptions: {
//     rejectUnauthorized: false, // Desabilitar a verificação do certificado
//   },
// }

// export const imap = new Imap(imapConfig);

interface ImapConfigProps {
  connectTo: 'financeiro' | 'atendimentoDF'
}

export async function ImapConfig({
  connectTo,
}: ImapConfigProps): Promise<ImapSimpleOptions> {
  let credentials

  if (connectTo === 'financeiro') {
    credentials = await accessTokenSerLimpa()
  } else if (connectTo === 'atendimentoDF') {
    credentials = await accessTokenCalledDF()
  }

  const { ID_CLIENT, ID_CLIENT_SECRET, refresh_token, user } = credentials

  const oauth2 = await xoauth2.createXOAuth2Generator({
    user,
    clientId: ID_CLIENT,
    clientSecret: ID_CLIENT_SECRET,
    refreshToken: refresh_token,
  })

  return new Promise((resolve, reject) => {
    oauth2.getToken(async (err, token) => {
      if (err) {
        reject(err)
      }

      const config: ImapSimpleOptions = {
        imap: {
          user,
          password: '',
          xoauth2: await token,
          host: 'imap.gmail.com',
          port: 993,
          tls: true,
          authTimeout: 3000,
          tlsOptions: {
            rejectUnauthorized: false, // Desabilitar a verificação do certificado
          },
        },
      }

      resolve(config)
    })
  })
}
