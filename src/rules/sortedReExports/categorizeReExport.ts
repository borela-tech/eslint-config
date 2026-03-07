import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {ReExportGroup} from './ReExportGroup'

export function categorizeReExport(
  declaration: ReExportDeclaration,
): ReExportGroup {
  // Example: export * from 'module' or export * as ns from 'module'
  if (declaration.type === 'ExportAllDeclaration') {
    // Export * as ns from 'module' has an 'exported' property
    if (declaration.exported)
      return 're-export-namespace'
    return 're-export-all'
  }

  // Example: export type {Type} from 'module'
  if (declaration.exportKind === 'type')
    return 're-export-type'

  // Example: export {value} from 'module'
  return 're-export-named'
}
