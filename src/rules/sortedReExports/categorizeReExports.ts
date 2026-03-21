import {categorizeReExport} from './categorizeReExport'
import {getReExportSortKey} from './getReExportSortKey'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export function categorizeReExports(
  declarations: ReExportDeclaration[],
): CategorizedReExport[] {
  return declarations.map(declaration => {
    return {
      declaration,
      group: categorizeReExport(declaration),
      sortKey: getReExportSortKey(declaration),
    } as CategorizedReExport
  })
}
