export function GetIdCalled(html: string) {
  const chamadosRegex = /CHM[\dA-Za-z]{7}/

  const chamado = html.match(chamadosRegex)

  if (!chamado) {
    return ''
  }
  const called = chamado[0]

  return called
}
