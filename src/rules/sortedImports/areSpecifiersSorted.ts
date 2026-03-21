import {compare} from '@lib/compare'
import {getImportSpecifierName} from './getImportSpecifierName'
import type {TSESTree} from '@typescript-eslint/types'

export function areSpecifiersSorted(
  specifiers: TSESTree.ImportSpecifier[],
): boolean {
  const names = specifiers.map(s => getImportSpecifierName(s))
  const sorted = [...names].sort((a, b) => compare(a, b))
  return names.every((name, i) => name === sorted[i])
}
