import type {SourceCode} from './SourceCode'
import type {TSESTree} from '@typescript-eslint/utils'

export function isOnSameLineAsCondition(
  node: TSESTree.Statement,
  sourceCode: SourceCode,
): boolean {
  const tokenBeforeBody = sourceCode.getTokenBefore(node)
  if (!tokenBeforeBody)
    return false

  const firstToken = sourceCode.getFirstToken(node)
  if (!firstToken)
    return false

  return tokenBeforeBody.loc.end.line === firstToken.loc.start.line
}
