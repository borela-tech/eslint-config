import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function isShorthand(
  sourceCode: TSESLint.SourceCode,
  node: TSESTree.ArrowFunctionExpression,
): boolean {
  if (node.params.length !== 1)
    return false

  const firstParam = node.params[0]
  const tokenBefore = sourceCode.getTokenBefore(firstParam)
  return !tokenBefore || tokenBefore.value !== '('
}
