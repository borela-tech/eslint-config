import type {CategorizedReExport} from '../CategorizedReExport'
import type {ReExportGroup} from '../ReExportGroup'

export function groupReExportsByType(
  categorized: CategorizedReExport[],
): Record<ReExportGroup, CategorizedReExport[]> {
  const grouped: Record<ReExportGroup, CategorizedReExport[]> = {
    're-export-all': [],
    're-export-named': [],
    're-export-namespace': [],
    'type-all': [],
    'type-named': [],
    'type-namespace': [],
  }

  for (const item of categorized)
    grouped[item.group].push(item)

  return grouped
}
