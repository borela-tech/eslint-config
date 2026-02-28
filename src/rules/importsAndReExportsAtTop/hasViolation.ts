import type {CategorizedStatements} from './CategorizedStatements'
import type {StatementIndices} from './StatementIndices'

export function hasViolation(
  indices: StatementIndices,
  categories: CategorizedStatements,
): boolean {
  const {
    firstImport,
    firstReExport,
    firstOther,
  } = indices

  // No imports or no re-exports.
  if (categories.imports.length === 0 || categories.reExports.length === 0)
    return false

  const firstImportOrReExport = Math.min(firstImport, firstReExport)
  const hasOtherBeforeImportOrReExport =
    firstOther !== -1 && firstOther < firstImportOrReExport

  // Violation if:
  // 1. Other statements appear before imports/re-exports.
  // 2. Re-exports appear before imports.
  if (hasOtherBeforeImportOrReExport || firstImport > firstReExport)
    return true

  return false
}
