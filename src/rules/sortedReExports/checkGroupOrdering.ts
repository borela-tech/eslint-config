import {reExportGroupOrder} from './reExportGroupOrder'
import type {CategorizedReExport} from './CategorizedReExport'
import type {ReExportValidationError} from './ReExportValidationError'

export function checkGroupOrdering(
  categorized: CategorizedReExport[],
): ReExportValidationError[] {
  const errors: ReExportValidationError[] = []

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
