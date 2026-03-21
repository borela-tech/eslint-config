import type {TSESTree} from '@typescript-eslint/utils'

export function isExportedDeclaration(
  parent: TSESTree.Node | undefined,
): boolean {
  return parent?.type === 'ExportNamedDeclaration'
}
