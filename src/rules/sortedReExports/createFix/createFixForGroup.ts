import {buildSortedReExportCode} from './buildSortedReExportCode'
import {categorizeReExports} from '../categorizeReExports'
import {groupReExportsByType} from './groupReExportsByType'
import {sortExportGroups} from './sortExportGroups'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'

export function createFixForGroup(
  fixer: TSESLint.RuleFixer,
  reExportDeclarations: ReExportDeclaration[],
  sourceCode: TSESLint.SourceCode,
) {
  if (reExportDeclarations.length === 0)
    return null

  const categorized = categorizeReExports(reExportDeclarations)
  const grouped = groupReExportsByType(categorized)

  sortExportGroups(grouped)

  const sortedCode = buildSortedReExportCode(grouped, sourceCode)
    .join('\n')

  const firstReExport = reExportDeclarations[0]
  const lastReExport = reExportDeclarations[reExportDeclarations.length - 1]

  return fixer.replaceTextRange(
    [firstReExport.range![0], lastReExport.range![1]],
    sortedCode,
  )
}
