import {categorizeReExport} from './categorizeReExport'
import {getSortKey} from './getSortKey'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export function categorizeReExports(
  declarations: ReExportDeclaration[],
): CategorizedReExport[] {
  return declarations.map(declaration => {
    return {
      declaration,
      group: categorizeReExport(declaration),
      sortKey: getSortKey(declaration),
    } as CategorizedReExport
  })
}
