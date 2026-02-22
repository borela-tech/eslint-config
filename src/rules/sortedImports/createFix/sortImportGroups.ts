import type {CategorizedImport} from '../CategorizedImport'
import type {ImportGroup} from '../ImportGroup'

export function sortImportGroups(
  grouped: Record<ImportGroup, CategorizedImport[]>,
): void {
  grouped['side-effect'].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  grouped['default'].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  grouped['named'].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
  grouped['type'].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
}
