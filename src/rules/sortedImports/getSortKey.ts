import {categorizeImport} from './categorizeImport'
import type {TSESTree} from '@typescript-eslint/types'

export function getSortKey(declaration: TSESTree.ImportDeclaration): string {
  const group = categorizeImport(declaration)

  if (group === 'side-effect')
    return (declaration.source.value as string).toLowerCase()

  if (group === 'default') {
    const defaultSpecifier = declaration.specifiers.find(
      s => s.type === 'ImportDefaultSpecifier',
    ) as TSESTree.ImportDefaultSpecifier | undefined

    return defaultSpecifier?.local.name.toLowerCase() ?? ''
  }

  const specifier = declaration.specifiers[0]
  return specifier.local.name.toLowerCase()
}
