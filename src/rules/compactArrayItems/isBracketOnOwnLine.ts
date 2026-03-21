import type {TSESLint} from '@typescript-eslint/utils'

export function isBracketOnOwnLine(
  sourceCode: TSESLint.SourceCode,
  openingBracket: TSESLint.AST.Token,
): boolean {
  const nextToken = sourceCode.getTokenAfter(openingBracket, {
    includeComments: false,
  })

  if (!nextToken)
    return false

  const text = sourceCode.getText()
  const openingBracketEndIndex = openingBracket.range[1]
  const textBetween = text.slice(
    openingBracketEndIndex,
    nextToken.range[0],
  )

  return textBetween.includes('\n')
}
