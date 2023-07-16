export function removerTagsWithRegex(text: string[]) {
  const regexRemoveTags = /<[^>]+>/g

  const stringsSemTags = text.map((str) => str.replace(regexRemoveTags, ''))

  return stringsSemTags
}
