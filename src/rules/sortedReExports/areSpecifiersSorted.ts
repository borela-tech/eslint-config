import {compare} from '../../lib/compare'
import {getSpecifierName} from './getSpecifierName'
import type {TSESTree} from '@typescript-eslint/types'

export function areSpecifiersSorted(specifiers: TSESTree.ExportSpecifier[]): boolean {
  const names = specifiers.map(s => getSpecifierName(s))
  const sorted = [...names].sort((a, b) => compare(a, b))
  return names.every((name, i) => name === sorted[i])
}
