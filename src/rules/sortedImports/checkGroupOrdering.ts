import type {CategorizedImport} from './CategorizedImport'
import type {ImportError} from './ImportError'
import type {ImportGroup} from './ImportGroup'

export function checkGroupOrdering(categorized: CategorizedImport[]): ImportError[] {
  const groupOrder: ImportGroup[] = ['side-effect', 'default', 'named', 'type']
  const errors: ImportError[] = []

  let currentGroupIndex = -1
  for (const {declaration, group} of categorized) {
    const groupIndex = groupOrder.indexOf(group)
    if (groupIndex < currentGroupIndex) {
      errors.push({
        node: declaration,
        messageId: 'wrongGroup',
      })
    } else
      currentGroupIndex = groupIndex
  }

  return errors
}
