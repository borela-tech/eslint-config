import {formatNamed} from './formatNamed'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function formatSpecifiers(
  declaration: TSESTree.ImportDeclaration,
  sourceCode: TSESLint.SourceCode,
): string {
  const defaultSpecifier = declaration.specifiers.find(
    (s): s is TSESTree.ImportDefaultSpecifier => s.type === 'ImportDefaultSpecifier',
  )
  const namespaceSpecifier = declaration.specifiers.find(
    (s): s is TSESTree.ImportNamespaceSpecifier => s.type === 'ImportNamespaceSpecifier',
  )
  const namedSpecifiers = declaration.specifiers.filter(
    (s): s is TSESTree.ImportSpecifier => s.type === 'ImportSpecifier',
  )

  if (namespaceSpecifier)
    return `* as ${namespaceSpecifier.local.name}`

  if (defaultSpecifier && namedSpecifiers.length > 0)
    return `${defaultSpecifier.local.name}, {${formatNamed(namedSpecifiers, sourceCode)}}`

  if (defaultSpecifier)
    return defaultSpecifier.local.name

  if (namedSpecifiers.length === 0)
    return ''

  return `{${formatNamed(namedSpecifiers, sourceCode)}}`
}
