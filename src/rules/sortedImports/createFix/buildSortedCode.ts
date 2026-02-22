import type {CategorizedImport} from '../CategorizedImport'
import type {ImportGroup} from '../ImportGroup'
import {formatNamedImport} from './formatNamedImport'

export function buildSortedCode(
  grouped: Record<ImportGroup, CategorizedImport[]>,
  sourceCode: {getText: (node?: unknown) => string},
): string[] {
  const groupOrder: ImportGroup[] = ['side-effect', 'default', 'named']
  const sortedCode: string[] = []

  for (const group of groupOrder) {
    for (const {declaration} of grouped[group]) {
      if (group === 'named')
        sortedCode.push(formatNamedImport(declaration, sourceCode))
      else
        sortedCode.push(sourceCode.getText(declaration))
    }
  }

  return sortedCode
}
