import type {TSESTree} from '@typescript-eslint/types'

export function getSpecifierName(specifier: TSESTree.ExportSpecifier): string {
  return specifier.local.type === 'Identifier'
    ? specifier.local.name
    : String(specifier.local.value)
}
