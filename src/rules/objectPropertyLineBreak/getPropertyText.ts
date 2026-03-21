import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getPropertyText(
  sourceCode: TSESLint.SourceCode,
  property: TSESTree.Property,
): string {
  return sourceCode.getText(property)
}
