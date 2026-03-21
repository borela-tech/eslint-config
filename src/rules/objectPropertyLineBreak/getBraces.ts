import type {Braces} from './Braces'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getBraces(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.ObjectExpression,
): Braces | null {
  const properties = node.properties
  if (properties.length === 0)
    return null

  const firstProp = properties[0]
  const lastProp = properties[properties.length - 1]

  const openingBrace = sourceCode.getTokenBefore(firstProp)
  const closingBrace = sourceCode.getTokenAfter(lastProp)

  if (!openingBrace || !closingBrace)
    return null

  return {closingBrace, openingBrace}
}
