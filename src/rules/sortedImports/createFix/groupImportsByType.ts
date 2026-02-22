import type {CategorizedImport} from '../CategorizedImport'
import type {ImportGroup} from '../ImportGroup'

export function groupImportsByType(
  categorized: CategorizedImport[],
): Record<ImportGroup, CategorizedImport[]> {
  const grouped: Record<ImportGroup, CategorizedImport[]> = {
    'side-effect': [],
    default: [],
    named: [],
    type: [],
  }

  for (const item of categorized)
    grouped[item.group].push(item)

  return grouped
}
