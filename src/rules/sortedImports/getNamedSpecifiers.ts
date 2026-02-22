import type {ImportDeclaration} from 'estree'
import type {ImportSpecifier} from 'estree'

export function getNamedSpecifiers(declaration: ImportDeclaration): ImportSpecifier[] {
  return declaration.specifiers.filter(
    (s): s is ImportSpecifier => s.type === 'ImportSpecifier',
  )
}
