import {compare} from '../../lib/compare'
import {getSpecifierName} from './getSpecifierName'
import type {TSESTree} from '@typescript-eslint/types'

export function sortSpecifiersText(
  specifiers: TSESTree.ExportSpecifier[],
  sourceCode: {getText: (node?: unknown) => string},
): string {
  const sorted = [...specifiers].sort((a, b) => {
    const nameA = getSpecifierName(a)
    const nameB = getSpecifierName(b)
    return compare(nameA, nameB)
  })
  return sorted.map(s => sourceCode.getText(s)).join(', ')
}
