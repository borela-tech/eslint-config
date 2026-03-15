import type {SourceCode} from './SourceCode'
import type {TSESTree} from '@typescript-eslint/utils'

export function getIndentation(
  node: TSESTree.Statement,
  sourceCode: SourceCode,
): string {
  const tokenBeforeBody = sourceCode.getTokenBefore(node)
  if (!tokenBeforeBody)
    return ''

  const line = sourceCode
    .getText()
    .split('\n')[tokenBeforeBody.loc.start.line - 1]

  if (!line)
    return ''

  const match = line.match(/^(\s*)/)
  return match?.[1] ?? ''
}
