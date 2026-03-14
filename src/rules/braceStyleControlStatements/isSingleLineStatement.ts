import type {SourceCode} from './SourceCode'
import type {TSESTree} from '@typescript-eslint/utils'

export function isSingleLineStatement(
  node: TSESTree.Statement,
  sourceCode: SourceCode,
): boolean {
  const firstToken = sourceCode.getFirstToken(node)
  if (!firstToken)
    return false

  const lastToken = sourceCode.getLastToken(node)
  if (!lastToken)
    return false

  return firstToken.loc.start.line === lastToken.loc.end.line
}
