import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {ReExportGroup} from './ReExportGroup'

export function categorizeReExport(
  declaration: ReExportDeclaration,
): ReExportGroup {
  // Example: export * from 'module' or export * as ns from 'module'
  if (declaration.type === 'ExportAllDeclaration') {
    // Example: export type * from 'module'
    if (declaration.exportKind === 'type') {
      // Example: export type * as ns from 'module'
      if (declaration.exported)
        return 'type-namespace'
      // Example: export type * from 'module'
      return 'type-all'
    }
    // Example: export * as ns from 'module'
    if (declaration.exported)
      return 're-export-namespace'
    // Example: export * from 'module'
    return 're-export-all'
  }

  // Example: export type {Type} from 'module'
  if (declaration.exportKind === 'type')
    return 'type-named'

  // Example: export { type Type } from 'module' (inline type modifier)
  if (declaration.specifiers?.some(s => s.exportKind === 'type'))
    return 'type-named'

  // Example: export {value} from 'module'
  return 're-export-named'
}
