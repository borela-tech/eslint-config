import {areSpecifiersSorted} from './areSpecifiersSorted'
import {getImportNamedSpecifiers} from './getImportNamedSpecifiers'
import type {CategorizedImport} from './CategorizedImport'
import type {ImportValidationError} from './ImportValidationError'

export function checkSpecifiersSorting(
  categorized: CategorizedImport[],
): ImportValidationError[] {
  const errors: ImportValidationError[] = []
  const namedImportDeclarations = categorized.filter(c => c.group === 'named')

  for (const {declaration} of namedImportDeclarations) {
    const namedSpecifiers = getImportNamedSpecifiers(declaration)
    if (namedSpecifiers.length > 1 && !areSpecifiersSorted(namedSpecifiers)) {
      errors.push({
        messageId: 'sortedNames',
        node: declaration,
      })
    }
  }

  return errors
}
