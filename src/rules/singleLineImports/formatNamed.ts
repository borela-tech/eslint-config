import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function formatNamed(
  specifiers: TSESTree.ImportSpecifier[],
  sourceCode: TSESLint.SourceCode,
): string {
  return specifiers.map(s => sourceCode.getText(s)).join(', ')
}
