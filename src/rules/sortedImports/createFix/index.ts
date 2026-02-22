import {buildSortedCode} from './buildSortedCode'
import {categorizeImports} from '../categorizeImports'
import {getReplacementRange} from './getReplacementRange'
import {groupImportsByType} from './groupImportsByType'
import {sortImportGroups} from './sortImportGroups'
import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

export function createFix(
  fixer: Rule.RuleFixer,
  importDeclarations: TSESTree.ImportDeclaration[],
  sourceCode: {getText: (node?: unknown) => string},
  programBody: TSESTree.ProgramStatement[],
) {
  const range = getReplacementRange(programBody)
  const categorized = categorizeImports(importDeclarations)
  const grouped = groupImportsByType(categorized)

  sortImportGroups(grouped)

  const sortedCode = buildSortedCode(grouped, sourceCode)
    .join('\n')

  return fixer.replaceTextRange(
    [range.start, range.end],
    sortedCode,
  )
}
