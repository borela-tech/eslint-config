import type {ImportDeclaration} from 'estree'
import type {ImportDefaultSpecifier} from 'estree'
import {categorizeImport} from './categorizeImport'

export function getSortKey(declaration: ImportDeclaration): string {
  const group = categorizeImport(declaration)

  if (group === 'side-effect')
    return (declaration.source.value as string).toLowerCase()

  if (group === 'default') {
    const defaultSpecifier = declaration.specifiers.find(
      s => s.type === 'ImportDefaultSpecifier',
    ) as ImportDefaultSpecifier | undefined

    return defaultSpecifier?.local.name.toLowerCase() ?? ''
  }

  return ''
}
