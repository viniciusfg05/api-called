export function GetDescription(html: string) {
  const descriptionRegex =
    /Descrição:\s*((?:(?!Resumo da Requisição|Anotações de Trabalho:).)*)/

  const description = html.match(descriptionRegex)

  const ItReturnRegexDescriptionForNull = '</strong></font></p><p></p>'

  if (!description) {
    return ''
  }

  const descriptionReplace = description[1].replace(/<[^>]+>/g, '')

  if (descriptionReplace === ItReturnRegexDescriptionForNull) {
    return ''
  }

  return descriptionReplace
}
