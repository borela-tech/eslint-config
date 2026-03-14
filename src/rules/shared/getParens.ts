import type {Parens} from './Parens'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getParens(
  sourceCode: TSESLint.SourceCode,
  nodes: TSESTree.Node[],
): Parens | null {
  if (nodes.length === 0)
    return null

  const firstNode = nodes[0]
  const lastNode = nodes[nodes.length - 1]

  const openingParen = sourceCode.getTokenBefore(firstNode)
  const closingParen = sourceCode.getTokenAfter(lastNode)

  if (!openingParen || !closingParen)
    return null

  return {openingParen, closingParen}
}
