import {categorizeReExport} from './categorizeReExport'
import {getSortKey} from './getSortKey'
import {ReExportDeclaration} from './ReExportDeclaration'
import type {CategorizedReExport} from './CategorizedReExport'

export function categorizeReExports(declarations: ReExportDeclaration[]): CategorizedReExport[] {
  return declarations.map(declaration => {
    return {
      declaration,
      group: categorizeReExport(declaration),
      sortKey: getSortKey(declaration),
    } as CategorizedReExport
  })
}
