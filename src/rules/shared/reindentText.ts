export function reindentText(
  text: string,
  newBaseIndent: string,
  indentStep: string,
): string {
  const lines = text.split('\n')

  let minIndent = Infinity
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '')
      continue
    const match = line.match(/^( *)/)
    if (match)
      minIndent = Math.min(minIndent, match[1].length)
  }

  if (minIndent === Infinity) {
    return lines
      .map(line => {
        if (line.trim() === '')
          return ''
        return newBaseIndent + indentStep + line.trimStart()
      })
      .join('\n')
  }

  return lines
    .map((line, index) => {
      if (line.trim() === '')
        return ''

      if (index === 0)
        return newBaseIndent + indentStep + line.trimStart()

      const relativeIndent = line.slice(minIndent)
      return newBaseIndent + indentStep + relativeIndent
    })
    .join('\n')
}
