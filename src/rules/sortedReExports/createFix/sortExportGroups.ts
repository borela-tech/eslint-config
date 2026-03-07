import {compare} from '@lib/compare'
import type {CategorizedReExport} from '../CategorizedReExport'
import type {ReExportGroup} from '../ReExportGroup'

export function sortExportGroups(
  grouped: Record<ReExportGroup, CategorizedReExport[]>,
): void {
  grouped['re-export-all'].sort((a, b) => compare(a.sortKey, b.sortKey))
  grouped['re-export-namespace'].sort((a, b) => compare(a.sortKey, b.sortKey))
  grouped['re-export-named'].sort((a, b) => compare(a.sortKey, b.sortKey))
  grouped['re-export-type'].sort((a, b) => compare(a.sortKey, b.sortKey))
}
