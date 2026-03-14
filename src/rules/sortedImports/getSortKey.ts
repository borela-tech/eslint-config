import {categorizeImport} from './categorizeImport'
import type {TSESTree} from '@typescript-eslint/types'

export function getSortKey(declaration: TSESTree.ImportDeclaration): string {
  const group = categorizeImport(declaration)

  if (group === 'side-effect')
    return declaration.source.value

  if (group === 'namespace' || group === 'type-namespace') {
    const namespaceSpecifier = declaration.specifiers.find(
      s => s.type === 'ImportNamespaceSpecifier',
    )
    return `*${namespaceSpecifier?.local.name ?? ''}`
  }

  if (group === 'default' || group === 'type-default') {
    const defaultSpecifier = declaration.specifiers.find(
      s => s.type === 'ImportDefaultSpecifier',
    )
    return defaultSpecifier?.local.name ?? ''
  }

  const specifier = declaration.specifiers[0]
  return specifier.local.name
}
