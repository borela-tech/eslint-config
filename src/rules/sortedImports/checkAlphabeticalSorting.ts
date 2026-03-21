import {compare} from '@lib/compare'
import {importGroupOrder} from './importGroupOrder'
import type {CategorizedImport} from './CategorizedImport'
import type {ImportValidationError} from './ImportValidationError'

export function checkAlphabeticalSorting(
  categorizedImports: CategorizedImport[],
): ImportValidationError[] {
  const errors: ImportValidationError[] = []

  for (const importGroup of importGroupOrder) {
    const groupImports = categorizedImports.filter(c => c.group === importGroup)
    const expectedSortedImports = [...groupImports].sort((a, b) => compare(
      a.sortKey,
      b.sortKey,
    ))
    for (let i = 0; i < groupImports.length; i++) {
      if (groupImports[i] !== expectedSortedImports[i]) {
        errors.push({
          messageId: 'sortedImports',
          node: groupImports[i].declaration,
        })
      }
    }
  }

  return errors
}
