import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getPropertyName(
  sourceCode: TSESLint.SourceCode,
  prop: TSESTree.Property,
): string {
  if (prop.key.type === 'Identifier')
    return prop.key.name
  return sourceCode.getText(prop)
}
