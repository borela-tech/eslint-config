import type {ImportGroup} from './ImportGroup'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeImport(declaration: TSESTree.ImportDeclaration): ImportGroup {
  // Example: import type {Type} from 'module'
  if (declaration.importKind === 'type')
    return 'type'

  // Example: import 'module'
  if (declaration.specifiers.length === 0)
    return 'side-effect'

  // Example: import * as fs from 'module'
  if (declaration.specifiers.some(s => s.type === 'ImportNamespaceSpecifier'))
    return 'namespace'

  // Example: import value from 'module'
  if (declaration.specifiers.some(s => s.type === 'ImportDefaultSpecifier'))
    return 'default'

  // Example: import {value} from 'module'
  return 'named'
}
