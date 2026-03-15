import {areSpecifiersSorted} from './areSpecifiersSorted'
import {getNamedSpecifiers} from './getNamedSpecifiers'
import type {CategorizedImport} from './CategorizedImport'
import type {ImportError} from './ImportError'

export function checkSpecifiersSorting(
  categorized: CategorizedImport[],
): ImportError[] {
  const errors: ImportError[] = []
  const namedImports = categorized.filter(c => c.group === 'named')

  for (const {declaration} of namedImports) {
    const specifiers = getNamedSpecifiers(declaration)
    if (specifiers.length > 1 && !areSpecifiersSorted(specifiers)) {
      errors.push({
        messageId: 'sortedNames',
        node: declaration,
      })
    }
  }

  return errors
}
