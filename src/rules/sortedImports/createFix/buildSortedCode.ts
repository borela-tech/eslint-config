import {formatNamedImport} from './formatNamedImport'
import {importGroupOrder} from '../ImportGroupOrder'
import type {CategorizedImport} from '../CategorizedImport'
import type {ImportGroup} from '../ImportGroup'

export function buildSortedCode(
  grouped: Record<ImportGroup, CategorizedImport[]>,
  sourceCode: {getText: (node?: unknown) => string},
): string[] {
  const sortedCode: string[] = []

  for (const group of importGroupOrder) {
    for (const {declaration} of grouped[group]) {
      if (group === 'named' || group === 'type')
        sortedCode.push(formatNamedImport(declaration, sourceCode))
      else
        sortedCode.push(sourceCode.getText(declaration))
    }
  }

  return sortedCode
}
