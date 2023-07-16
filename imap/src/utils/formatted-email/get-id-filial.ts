export function GetIdFilial(html: string) {
  const filialRegex = /DS\d{4}/g
  const filial = html.match(filialRegex)

  if (!filial) {
    return ''
  }

  const idFilial = filial[1]

  return idFilial
}
