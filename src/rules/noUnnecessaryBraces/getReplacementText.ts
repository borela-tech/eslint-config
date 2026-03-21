export function getReplacementText(
  statementText: string,
  baseIndent: string,
  hasElseAfter: boolean | null,
): string {
  const statementIndent = `${baseIndent}  `

  if (hasElseAfter)
    return `\n${statementIndent}${statementText}\n${baseIndent}`

  return `\n${statementIndent}${statementText}`
}
