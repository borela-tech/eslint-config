import {compare} from '@lib/compare'
import {reExportGroupOrder} from './ReExportGroupOrder'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportError} from './ReExportError'

export function checkAlphabeticalSorting(
  categorized: CategorizedReExport[],
): ReExportError[] {
  const errors: ReExportError[] = []

  for (const group of reExportGroupOrder) {
    const groupReExports = categorized.filter(c => c.group === group)
    const sorted = [...groupReExports].sort((a, b) =>
      compare(a.sortKey, b.sortKey),
    )
    for (let i = 0; i < groupReExports.length; i++) {
      if (groupReExports[i] !== sorted[i]) {
        errors.push({
          node: groupReExports[i].declaration,
          messageId: 'sortedReExports',
        })
      }
    }
  }

  return errors
}
