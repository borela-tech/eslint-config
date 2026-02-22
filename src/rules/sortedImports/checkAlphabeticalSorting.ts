import type {CategorizedImport} from './CategorizedImport'
import type {ImportError} from './ImportError'
import type {ImportGroup} from './ImportGroup'

export function checkAlphabeticalSorting(categorized: CategorizedImport[]): ImportError[] {
  const errors: ImportError[] = []

  for (const group of ['side-effect', 'default', 'named', 'type'] as ImportGroup[]) {
    const groupImports = categorized.filter(c => c.group === group)
    const sorted = [...groupImports].sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    for (let i = 0; i < groupImports.length; i++) {
      if (groupImports[i] !== sorted[i]) {
        errors.push({
          node: groupImports[i].declaration,
          messageId: 'sortedImports',
        })
      }
    }
  }

  return errors
}
