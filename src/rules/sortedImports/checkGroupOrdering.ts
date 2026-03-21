import {importGroupOrder} from './importGroupOrder'
import type {CategorizedImport} from './CategorizedImport'
import type {ImportValidationError} from './ImportValidationError'

export function checkGroupOrdering(
  categorizedImports: CategorizedImport[],
): ImportValidationError[] {
  const errors: ImportValidationError[] = []

  let currentGroupIndex = -1
  for (const {declaration, group: importGroup} of categorizedImports) {
    const groupIndex = importGroupOrder.indexOf(importGroup)
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
