import {compare} from '@lib/compare'
import {getSpecifierName} from './getSpecifierName'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function sortSpecifiersText(
  specifiers: TSESTree.ExportSpecifier[],
  sourceCode: TSESLint.SourceCode,
): string {
  const sorted = [...specifiers].sort((a, b) => {
    const nameA = getSpecifierName(a)
    const nameB = getSpecifierName(b)
    return compare(nameA, nameB)
  })
  return sorted.map(s => sourceCode.getText(s)).join(', ')
}
