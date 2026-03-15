import {reExportGroupOrder} from './reExportGroupOrder'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportError} from './ReExportError'

export function checkGroupOrdering(
  categorized: CategorizedReExport[],
): ReExportError[] {
  const errors: ReExportError[] = []

  let currentGroupIndex = -1
  for (const {declaration, group} of categorized) {
    const groupIndex = reExportGroupOrder.indexOf(group)
    if (groupIndex < currentGroupIndex) {
      errors.push({
        messageId: 'wrongGroup',
        node: declaration,
      })
    } else
      currentGroupIndex = groupIndex
  }

  return errors
}
