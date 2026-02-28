import type {TSESTree} from '@typescript-eslint/types'

export function getSortKey(
  declaration: TSESTree.ExportNamedDeclaration | TSESTree.ExportAllDeclaration,
): string {
  if (declaration.type === 'ExportAllDeclaration')
    return declaration.source.value

  const specifier = declaration.specifiers[0]
  if (!specifier)
    return ''

  return specifier.local.type === 'Identifier'
    ? specifier.local.name
    : specifier.local.value
}
