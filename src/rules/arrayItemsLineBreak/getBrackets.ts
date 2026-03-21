import type {Brackets} from './Brackets'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getBrackets(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.ArrayExpression,
): Brackets | null {
  const elements = node.elements
  if (elements.length === 0)
    return null

  // Find the first non-null element
  const firstElement = elements.find(el => el !== null)
  if (!firstElement)
    return null

  // Find the last non-null element
  const lastElement = [...elements].reverse().find(el => el !== null)
  if (!lastElement)
    return null

  const openingBracket = sourceCode.getTokenBefore(firstElement)
  const closingBracket = sourceCode.getTokenAfter(lastElement)

  if (!openingBracket || !closingBracket)
    return null

  if (openingBracket.value !== '[' || closingBracket.value !== ']')
    return null

  return {closingBracket, openingBracket}
}
