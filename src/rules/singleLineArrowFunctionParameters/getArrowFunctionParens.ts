import type {ArrowFunctionParens} from './ArrowFunctionParens'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getArrowFunctionParens(
  sourceCode: TSESLint.SourceCode,
  params: TSESTree.Parameter[],
): ArrowFunctionParens | null {
  if (params.length === 0)
    return null

  const firstParam = params[0]
  const lastParam = params[params.length - 1]

  const openingParen = sourceCode.getTokenBefore(firstParam)
  let closingParen = sourceCode.getTokenAfter(lastParam)

  while (closingParen && closingParen.value === ',')
    closingParen = sourceCode.getTokenAfter(closingParen)

  if (!openingParen || !closingParen)
    return null

  if (openingParen.value !== '(' || closingParen.value !== ')')
    return null

  return {closingParen, openingParen}
}
