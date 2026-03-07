import {compare} from '@lib/compare'
import type {CategorizedImport} from '../CategorizedImport'
import type {ImportGroup} from '../ImportGroup'

export function sortImportGroups(
  grouped: Record<ImportGroup, CategorizedImport[]>,
): void {
  grouped['side-effect'].sort((a, b) => compare(a.sortKey, b.sortKey))
  grouped['default'].sort((a, b) => compare(a.sortKey, b.sortKey))
  grouped['named'].sort((a, b) => compare(a.sortKey, b.sortKey))
  grouped['type'].sort((a, b) => compare(a.sortKey, b.sortKey))
}
