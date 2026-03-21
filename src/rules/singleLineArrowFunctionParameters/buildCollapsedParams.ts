import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function buildCollapsedParams(
  sourceCode: TSESLint.SourceCode,
  params: TSESTree.Parameter[],
): string {
  const paramsText = params
    .map((param, index) => {
      const text = sourceCode.getText(param)
      const isLastParam = index === params.length - 1
      return isLastParam ? text : text + ','
    })
    .join(' ')

  return `(${paramsText})`
}
