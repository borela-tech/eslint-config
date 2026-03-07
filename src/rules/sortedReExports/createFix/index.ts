import {buildSortedCode} from './buildSortedCode'
import {categorizeReExports} from '../categorizeReExports'
import {groupReExportsByType} from './groupReExportsByType'
import {sortExportGroups} from './sortExportGroups'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'

function createFixForGroup(
  fixer: TSESLint.RuleFixer,
  reExportDeclarations: ReExportDeclaration[],
  sourceCode: TSESLint.SourceCode,
) {
  if (reExportDeclarations.length === 0)
    return null

  const categorized = categorizeReExports(reExportDeclarations)
  const grouped = groupReExportsByType(categorized)

  sortExportGroups(grouped)

  const sortedCode = buildSortedCode(grouped, sourceCode)
    .join('\n')

  const firstReExport = reExportDeclarations[0]
  const lastReExport = reExportDeclarations[reExportDeclarations.length - 1]

  return fixer.replaceTextRange(
    [firstReExport.range![0], lastReExport.range![1]],
    sortedCode,
  )
}

export function createFix(
  fixer: TSESLint.RuleFixer,
  reExportGroups: ReExportDeclaration[][],
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix[] {
  const fixes: TSESLint.RuleFix[] = []

  for (const group of reExportGroups) {
    const fix = createFixForGroup(fixer, group, sourceCode)
    if (fix)
      fixes.push(fix)
  }

  return fixes
}
