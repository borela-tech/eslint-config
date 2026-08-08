import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getInlineParamText(
  sourceCode: TSESLint.SourceCode,
  param: TSESTree.Parameter,
): string {
  // Collapse newlines and surrounding whitespace into a single line.
  return sourceCode.getText(param)
    .replaceAll(/[\t ]*\r?\n[\t ]*/g, ' ')
    .replaceAll(/\s+([),:\]}])/g, '$1')
    .replaceAll(/,([\]}])/g, '$1')
    .replaceAll(/([([{])\s+/g, '$1')
    .trim()
}
