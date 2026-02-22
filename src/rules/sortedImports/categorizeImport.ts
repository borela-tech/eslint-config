import type {ImportGroup} from './ImportGroup'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeImport(declaration: TSESTree.ImportDeclaration): ImportGroup {
  if (declaration.importKind === 'type')
    return 'type'

  if (declaration.specifiers.length === 0)
    return 'side-effect'

  if (declaration.specifiers.some(s => s.type === 'ImportDefaultSpecifier'))
    return 'default'

  return 'named'
}
