import {compare} from '@lib/compare'
import {reExportGroupOrder} from './reExportGroupOrder'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportValidationError} from './ReExportValidationError'

export function checkAlphabeticalSorting(
  categorized: CategorizedReExport[],
): ReExportValidationError[] {
  const errors: ReExportValidationError[] = []

  for (const group of reExportGroupOrder) {
    const groupReExports = categorized.filter(c => c.group === group)
    const sorted = [...groupReExports].sort((a, b) =>
      compare(a.sortKey, b.sortKey),
    )
    for (let i = 0; i < groupReExports.length; i++) {
      if (groupReExports[i] !== sorted[i]) {
        errors.push({
          messageId: 'sortedReExports',
          node: groupReExports[i].declaration,
        })
      }
    }
  }

  return errors
}
