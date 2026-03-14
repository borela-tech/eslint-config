import type {CategorizedReExport} from '../CategorizedReExport'
import type {ReExportGroup} from '../ReExportGroup'

export function groupReExportsByType(
  categorized: CategorizedReExport[],
): Record<ReExportGroup, CategorizedReExport[]> {
  const grouped: Record<ReExportGroup, CategorizedReExport[]> = {
    're-export-all': [],
    're-export-namespace': [],
    're-export-named': [],
    'type-all': [],
    'type-namespace': [],
    'type-named': [],
  }

  for (const item of categorized)
    grouped[item.group].push(item)

  return grouped
}
