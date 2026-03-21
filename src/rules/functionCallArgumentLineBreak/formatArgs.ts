import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function formatArgs(
  sourceCode: TSESLint.SourceCode,
  nodes: TSESTree.Node[],
  indent: string,
): string {
  return nodes
    .map((arg, index) => {
      const argText = sourceCode.getText(arg)
      const isLast = index === nodes.length - 1
      if (isLast)
        return argText
      const comma = sourceCode.getTokenAfter(arg, token => token.value === ',')
      if (comma && comma.loc.end.line === arg.loc.end.line)
        return argText + ','
      return argText
    })
    .map((text, index) =>
      index === 0 ? `${indent}${text}` : `\n${indent}${text}`,
    )
    .join('')
}
