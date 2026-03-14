import type {ImportGroup} from './ImportGroup'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeImport(
  declaration: TSESTree.ImportDeclaration,
): ImportGroup {
  if (declaration.specifiers.some(s => s.type === 'ImportNamespaceSpecifier')) {
    return declaration.importKind === 'type'
      ? 'type-namespace'
      : 'namespace'
  }

  if (declaration.specifiers.some(s => s.type === 'ImportDefaultSpecifier')) {
    return declaration.importKind === 'type'
      ? 'type-default'
      : 'default'
  }

  if (declaration.importKind === 'type')
    return 'type-named'

  if (declaration.specifiers.length === 0)
    return 'side-effect'

  return 'named'
}
