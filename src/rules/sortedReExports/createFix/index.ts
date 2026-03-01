import {buildSortedCode} from './buildSortedCode'
import {categorizeReExports} from '../categorizeReExports'
import {groupReExportsByType} from './groupReExportsByType'
import {ReExportDeclaration} from '../ReExportDeclaration'
import {sortExportGroups} from './sortExportGroups'
import type {Rule} from 'eslint'

function createFixForGroup(
  fixer: Rule.RuleFixer,
  reExportDeclarations: ReExportDeclaration[],
  sourceCode: {getText: (node?: unknown) => string},
): Rule.Fix | null {
  if (reExportDeclarations.length === 0) {
    return null
  }

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
  fixer: Rule.RuleFixer,
  reExportGroups: ReExportDeclaration[][],
  sourceCode: {getText: (node?: unknown) => string},
): Rule.Fix[] {
  const fixes: Rule.Fix[] = []

  for (const group of reExportGroups) {
    const fix = createFixForGroup(fixer, group, sourceCode)
    if (fix)
      fixes.push(fix)
  }

  return fixes
}
