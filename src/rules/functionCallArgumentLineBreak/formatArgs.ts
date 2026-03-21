import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function formatArgs(
  sourceCode: TSESLint.SourceCode,
  sortedNodes: TSESTree.Node[],
  indent: string,
): string {
  return sortedNodes
    .map((arg, index) => {
      const argText = sourceCode.getText(arg)
      const isLast = index === sortedNodes.length - 1
      if (isLast)
        return argText
      const comma = sourceCode.getTokenAfter(
        arg,
        token => token.value === ',',
      )
      if (comma && comma.loc.end.line === arg.loc.end.line)
        return argText + ','
      return argText
    })
    .map((text, index) =>
      index === 0 ? `${indent}${text}` : `\n${indent}${text}`,
    )
    .join('')
}
