import type {ReExportGroup} from './ReExportGroup'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeReExport(
  declaration: TSESTree.ExportNamedDeclaration | TSESTree.ExportAllDeclaration,
): ReExportGroup {
  // Example: export * from 'module'
  if (declaration.type === 'ExportAllDeclaration')
    return 're-export-all'

  // Example: export type {Type} from 'module'
  if (declaration.exportKind === 'type')
    return 're-export-type'

  // Example: export {value} from 'module'
  return 're-export-named'
}
