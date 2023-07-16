import { google } from 'googleapis'

export async function accessTokenSerLimpa() {
  const ID_CLIENT =
    '644619416664-8c83ftgqeqnef4c536j6tee1965oulcp.apps.googleusercontent.com'
  const ID_CLIENT_SECRET = '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'
  const uri = 'https://developers.google.com/oauthplayground'
  const refresh_token =
    '1//04qkVkQyZIjOHCgYIARAAGAQSNwF-L9IrB-NfMJyLHNWgloguS31_nOPvdOkCCGAdB0VsYUrebulkOsNqo0KZ_Y5EcbT_xQK7sGA'
  const user = 'financeiro@serlimpa.com.br'

  const oauth2Client = new google.auth.OAuth2(ID_CLIENT, ID_CLIENT_SECRET, uri)

  oauth2Client.setCredentials({
    refresh_token,
  })

  const accessToken = await oauth2Client.getAccessToken()

  return { accessToken, ID_CLIENT, ID_CLIENT_SECRET, refresh_token, user }
}

export async function accessTokenCalledDF() {
  const ID_CLIENT =
    '742050614579-66agm9fr1efh7q2mikq3rkfgi0egsflr.apps.googleusercontent.com'
  const ID_CLIENT_SECRET = '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'
  const uri = 'https://developers.google.com/oauthplayground'
  const refresh_token =
    '1//04DvaavHJJsO7CgYIARAAGAQSNwF-L9Ir77sMjEJqQizdhw9E76KXfdIXRqDX18KZdzlAIGw7MPlSbhaB0Yyte-NhQPpzUnl6wBY'
  const user = 'atendimentodf@serlimpa.com.br'

  const oauth2Client = new google.auth.OAuth2(ID_CLIENT, ID_CLIENT_SECRET, uri)

  oauth2Client.setCredentials({
    refresh_token,
  })

  const accessToken = await oauth2Client.getAccessToken()

  return { accessToken, ID_CLIENT, ID_CLIENT_SECRET, refresh_token, user }
}
