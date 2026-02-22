import type {Rule} from 'eslint'
import type {ImportDeclaration} from 'estree'
import type {Program} from 'estree'
import {buildSortedCode} from './buildSortedCode'
import {categorizeImports} from '../categorizeImports'
import {getReplacementRange} from './getReplacementRange'
import {groupImportsByType} from './groupImportsByType'
import {sortImportGroups} from './sortImportGroups'

export function createFix(
  fixer: Rule.RuleFixer,
  importDeclarations: ImportDeclaration[],
  sourceCode: {getText: (node?: unknown) => string},
  programBody: Program['body'],
) {
  const range = getReplacementRange(programBody, sourceCode)
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
