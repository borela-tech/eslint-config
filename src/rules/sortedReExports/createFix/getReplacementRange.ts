import {findFirstExportIndex} from './findFirstExportIndex'
import {findLastExportIndex} from './findLastExportIndex'
import type {ReplacementRange} from '@lib/ReplacementRange'
import type {TSESTree} from '@typescript-eslint/types'

export function getReplacementRange(
  programBody: TSESTree.ProgramStatement[],
): ReplacementRange {
  const firstIndex = findFirstExportIndex(programBody)
  const lastIndex = findLastExportIndex(programBody)

  if (firstIndex === -1 || lastIndex === -1) {
    return {
      end: 0,
      start: 0,
    }
  }

  const firstExport = programBody[firstIndex]
  const lastExport = programBody[lastIndex]

  const start = firstExport.range[0]
  const end = lastExport.range[1]

  return {end, start}
}
