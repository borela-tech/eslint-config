import type {ImportDeclaration} from 'estree'
import type {ImportGroup} from './ImportGroup'

export function categorizeImport(declaration: ImportDeclaration): ImportGroup {
  if (declaration.specifiers.length === 0)
    return 'side-effect'

  if (declaration.specifiers.some(s => s.type === 'ImportDefaultSpecifier'))
    return 'default'

  return 'named'
}
