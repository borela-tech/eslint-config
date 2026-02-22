import type {TSESTree} from '@typescript-eslint/types'
import type {ReplacementRange} from './ReplacementRange'
import {findLastImportIndex} from './findLastImportIndex'

export function getReplacementRange(
  programBody: TSESTree.ProgramStatement[],
  sourceCode: {getText: () => string},
): ReplacementRange {
  const lastIndex = findLastImportIndex(programBody)
  const firstImport = programBody[0] as TSESTree.ImportDeclaration
  const lastImport = programBody[lastIndex] as TSESTree.ImportDeclaration
  const start = firstImport.range![0]
  const end = lastImport.range![1]
  return {start, end}
}
