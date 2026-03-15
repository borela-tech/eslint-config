import type {TSESLint} from '@typescript-eslint/utils'

export function detectIndentStep(sourceCode: TSESLint.SourceCode): number {
  const text = sourceCode.getText()
  const lines = text.split('\n')
  const indentCounts = new Map<number, number>()

  for (const line of lines) {
    const match = line.match(/^( *)/)
    if (match) {
      const spaces = match[1].length
      if (spaces > 0)
        indentCounts.set(spaces, (indentCounts.get(spaces) ?? 0) + 1)
    }
  }

  const sortedIndents = Array.from(indentCounts.entries())
    .filter(([spaces]) => spaces > 0)
    .sort((a, b) => a[0] - b[0])

  if (sortedIndents.length === 0)
    return 2

  const minIndent = sortedIndents[0][0]

  for (const step of [2, 4]) {
    const isMultipleOfStep = sortedIndents.every(([n]) => n % step === 0)
    if (isMultipleOfStep)
      return step
  }

  return minIndent
}
