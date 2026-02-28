import {buildSortedCode} from './buildSortedCode'
import {categorizeReExports} from '../categorizeReExports'
import {getReplacementRange} from './getReplacementRange'
import {groupReExportsByType} from './groupReExportsByType'
import {ReExportDeclaration} from '../ReExportDeclaration'
import {sortExportGroups} from './sortExportGroups'
import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

export function createFix(
  fixer: Rule.RuleFixer,
  reExportDeclarations: ReExportDeclaration[],
  sourceCode: {getText: (node?: unknown) => string},
  programBody: TSESTree.ProgramStatement[],
) {
  const range = getReplacementRange(programBody)
  const categorized = categorizeReExports(reExportDeclarations)
  const grouped = groupReExportsByType(categorized)

  sortExportGroups(grouped)

  const sortedCode = buildSortedCode(grouped, sourceCode)
    .join('\n')

  return fixer.replaceTextRange(
    [range.start, range.end],
    sortedCode,
  )
}
