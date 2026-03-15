import {compare} from '@lib/compare'
import {importGroupOrder} from './importGroupOrder'
import type {CategorizedImport} from './CategorizedImport'
import type {ImportError} from './ImportError'

export function checkAlphabeticalSorting(
  categorized: CategorizedImport[],
): ImportError[] {
  const errors: ImportError[] = []

  for (const group of importGroupOrder) {
    const groupImports = categorized.filter(c => c.group === group)
    const sorted = [...groupImports].sort((a, b) => compare(a.sortKey, b.sortKey))
    for (let i = 0; i < groupImports.length; i++) {
      if (groupImports[i] !== sorted[i]) {
        errors.push({
          messageId: 'sortedImports',
          node: groupImports[i].declaration,
        })
      }
    }
  }

  return errors
}
