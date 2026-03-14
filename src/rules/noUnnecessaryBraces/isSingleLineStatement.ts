import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function isSingleLineStatement(
  node: TSESTree.Statement,
  sourceCode: TSESLint.SourceCode,
): boolean {
  const firstToken = sourceCode.getFirstToken(node)
  const lastToken = sourceCode.getLastToken(node)

  if (!firstToken || !lastToken)
    return false

  return firstToken.loc.start.line === lastToken.loc.end.line
}
