import {buildSortedImportCode} from './buildSortedImportCode'
import {categorizeImports} from '../categorizeImports'
import {groupImportsByType} from './groupImportsByType'
import {sortImportGroups} from './sortImportGroups'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function createFixForGroup(
  fixer: TSESLint.RuleFixer,
  importDeclarations: TSESTree.ImportDeclaration[],
  sourceCode: TSESLint.SourceCode,
) {
  if (importDeclarations.length === 0)
    return null

  const categorized = categorizeImports(importDeclarations)
  const grouped = groupImportsByType(categorized)

  sortImportGroups(grouped)

  const sortedCode = buildSortedImportCode(grouped, sourceCode)
    .join('\n')

  const firstImport = importDeclarations[0]
  const lastImport = importDeclarations[importDeclarations.length - 1]

  return fixer.replaceTextRange(
    [firstImport.range![0], lastImport.range![1]],
    sortedCode,
  )
}
