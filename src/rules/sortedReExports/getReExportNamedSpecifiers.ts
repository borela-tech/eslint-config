import type {TSESTree} from '@typescript-eslint/types'

export function getReExportNamedSpecifiers(
  declaration: TSESTree.ExportNamedDeclaration,
): TSESTree.ExportSpecifier[] {
  return declaration.specifiers.filter(
    s => s.type === 'ExportSpecifier' && s.local.type === 'Identifier',
  )
}
