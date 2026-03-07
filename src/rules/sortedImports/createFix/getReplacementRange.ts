import {findLastImportIndex} from './findLastImportIndex'
import type {ReplacementRange} from '@lib/ReplacementRange'
import type {TSESTree} from '@typescript-eslint/types'

export function getReplacementRange(
  programBody: TSESTree.ProgramStatement[],
): ReplacementRange {
  const lastIndex = findLastImportIndex(programBody)
  const firstImport = programBody[0]
  const lastImport = programBody[lastIndex]
  const start = firstImport.range![0]
  const end = lastImport.range![1]
  return {start, end}
}
