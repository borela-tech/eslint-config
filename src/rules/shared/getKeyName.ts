import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function getKeyName(
  key: TSESTree.ClassPropertyNameNonComputed | TSESTree.PrivateIdentifier,
  sourceCode: TSESLint.SourceCode,
): string {
  if (key.type === 'Identifier' || key.type === 'PrivateIdentifier')
    return key.name

  if (key.type === 'Literal')
    return String(key.value)

  return sourceCode.getText(key)
}
