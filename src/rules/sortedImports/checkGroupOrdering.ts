import {importGroupOrder} from './importGroupOrder'
import type {CategorizedImport} from './CategorizedImport'
import type {ImportError} from './ImportError'

export function checkGroupOrdering(
  categorized: CategorizedImport[],
): ImportError[] {
  const errors: ImportError[] = []

  let currentGroupIndex = -1
  for (const {declaration, group} of categorized) {
    const groupIndex = importGroupOrder.indexOf(group)
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
