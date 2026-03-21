import {areSpecifiersSorted} from './areSpecifiersSorted'
import {getReExportNamedSpecifiers} from './getReExportNamedSpecifiers'
import {isNamedReExport} from './isNamedReExport'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportValidationError} from './ReExportValidationError'

export function checkSpecifiersSorting(
  categorized: CategorizedReExport[],
): ReExportValidationError[] {
  const errors: ReExportValidationError[] = []
  const namedReExports = categorized.filter(isNamedReExport)

  for (const {declaration} of namedReExports) {
    const specifiers = getReExportNamedSpecifiers(declaration)
    const isSorted = areSpecifiersSorted(specifiers)
    if (specifiers.length > 1 && !isSorted) {
      errors.push({
        messageId: 'sortedNames',
        node: declaration,
      })
    }
  }

  return errors
}
