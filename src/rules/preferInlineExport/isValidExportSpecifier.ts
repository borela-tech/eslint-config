import type {LocalDeclaration} from './LocalDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

export function isValidExportSpecifier(
  specifier: TSESTree.ExportSpecifier,
  localDeclarations: Map<string, LocalDeclaration>,
): boolean {
  if (specifier.local.type !== 'Identifier')
    return false

  if (specifier.exported.type !== 'Identifier')
    return false

  if (specifier.local.name !== specifier.exported.name)
    return false

  return localDeclarations.has(specifier.local.name)
}
