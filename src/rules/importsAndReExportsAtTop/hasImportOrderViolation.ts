import type {CategorizedStatements} from './CategorizedStatements'
import type {StatementIndices} from './StatementIndices'

export function hasImportOrderViolation(
  indices: StatementIndices,
  categories: CategorizedStatements,
): boolean {
  const {firstRegularStatement, lastImport, lastReExport} = indices

  if (categories.imports.length === 0 && categories.reExports.length === 0)
    return false

  const hasImportAfterRegularStatement = (
    categories.imports.length > 0
    && firstRegularStatement !== -1
    && lastImport > firstRegularStatement
  )
  const hasReExportAfterRegularStatement = (
    categories.reExports.length > 0
    && firstRegularStatement !== -1
    && lastReExport > firstRegularStatement
  )

  return hasImportAfterRegularStatement || hasReExportAfterRegularStatement
}
