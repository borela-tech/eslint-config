import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function formatParams(
  sourceCode: TSESLint.SourceCode,
  sortedNodes: TSESTree.Parameter[],
  indent: string,
): string {
  return sortedNodes
    .map((param, index) => {
      const paramText = sourceCode.getText(param)
      const isLast = index === sortedNodes.length - 1
      if (isLast)
        return paramText
      const comma = sourceCode.getTokenAfter(
        param,
        token => token.value === ',',
      )
      if (comma && comma.loc.end.line === param.loc.end.line)
        return paramText + ','
      return paramText
    })
    .map((text, index) =>
      index === 0 ? `${indent}${text}` : `\n${indent}${text}`,
    )
    .join('')
}
