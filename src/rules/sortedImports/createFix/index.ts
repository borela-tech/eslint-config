import {buildSortedCode} from './buildSortedCode'
import {categorizeImports} from '../categorizeImports'
import {groupImportsByType} from './groupImportsByType'
import {sortImportGroups} from './sortImportGroups'
import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

function createFixForGroup(
  fixer: Rule.RuleFixer,
  importDeclarations: TSESTree.ImportDeclaration[],
  sourceCode: {getText: (node?: unknown) => string},
): Rule.Fix | null {
  if (importDeclarations.length === 0) {
    return null
  }

  const categorized = categorizeImports(importDeclarations)
  const grouped = groupImportsByType(categorized)

  sortImportGroups(grouped)

  const sortedCode = buildSortedCode(grouped, sourceCode)
    .join('\n')

  const firstImport = importDeclarations[0]
  const lastImport = importDeclarations[importDeclarations.length - 1]

  return fixer.replaceTextRange(
    [firstImport.range![0], lastImport.range![1]],
    sortedCode,
  )
}

export function createFix(
  fixer: Rule.RuleFixer,
  importGroups: TSESTree.ImportDeclaration[][],
  sourceCode: {getText: (node?: unknown) => string},
): Rule.Fix[] {
  const fixes: Rule.Fix[] = []

  for (const group of importGroups) {
    const fix = createFixForGroup(fixer, group, sourceCode)
    if (fix)
      fixes.push(fix)
  }

  return fixes
}
