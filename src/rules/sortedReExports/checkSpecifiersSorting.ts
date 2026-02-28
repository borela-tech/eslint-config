import {areSpecifiersSorted} from './areSpecifiersSorted'
import {getNamedSpecifiers} from './getNamedSpecifiers'
import {isNamedReExport} from './isNamedReExport'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportError} from './ReExportError'

export function checkSpecifiersSorting(categorized: CategorizedReExport[]): ReExportError[] {
  const errors: ReExportError[] = []
  const namedReExports = categorized.filter(isNamedReExport)

  for (const {declaration} of namedReExports) {
    const specifiers = getNamedSpecifiers(declaration)
    const isSorted = areSpecifiersSorted(specifiers)
    if (specifiers.length > 1 && !isSorted) {
      errors.push({
        node: declaration,
        messageId: 'sortedNames',
      })
    }
  }

  return errors
}
