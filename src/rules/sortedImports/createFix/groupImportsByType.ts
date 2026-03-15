import type {CategorizedImport} from '../CategorizedImport'
import type {ImportGroup} from '../ImportGroup'

export function groupImportsByType(
  categorized: CategorizedImport[],
): Record<ImportGroup, CategorizedImport[]> {
  const grouped: Record<ImportGroup, CategorizedImport[]> = {
    default: [],
    named: [],
    namespace: [],
    'side-effect': [],
    'type-default': [],
    'type-named': [],
    'type-namespace': [],
  }

  for (const item of categorized)
    grouped[item.group].push(item)

  return grouped
}
