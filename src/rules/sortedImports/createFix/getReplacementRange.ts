import {findLastImportIndex} from './findLastImportIndex'
import type {ReplacementRange} from '../../../lib/ReplacementRange'
import type {TSESTree} from '@typescript-eslint/types'

export function getReplacementRange(
  programBody: TSESTree.ProgramStatement[],
): ReplacementRange {
  const lastIndex = findLastImportIndex(programBody)
  const firstImport = programBody[0] as TSESTree.ImportDeclaration
  const lastImport = programBody[lastIndex] as TSESTree.ImportDeclaration
  const start = firstImport.range![0]
  const end = lastImport.range![1]
  return {start, end}
}
