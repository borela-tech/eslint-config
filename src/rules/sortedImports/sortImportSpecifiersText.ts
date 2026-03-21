import {compare} from '@lib/compare'
import {getImportSpecifierName} from './getImportSpecifierName'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function sortImportSpecifiersText(
  specifiers: TSESTree.ImportSpecifier[],
  sourceCode: TSESLint.SourceCode,
): string {
  const sorted = [...specifiers].sort((a, b) => {
    const nameA = getImportSpecifierName(a)
    const nameB = getImportSpecifierName(b)
    return compare(nameA, nameB)
  })
  return sorted.map(s => sourceCode.getText(s)).join(', ')
}
