import type {TSESTree} from '@typescript-eslint/types'

export function getSpecifierName(specifier: TSESTree.ImportSpecifier): string {
  return specifier.imported.type === 'Identifier'
    ? specifier.imported.name
    : String(specifier.imported.value)
}
