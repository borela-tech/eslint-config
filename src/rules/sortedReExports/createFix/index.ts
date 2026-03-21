import {createFixForGroup} from './createFixForGroup'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'

export function createReExportFix(
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
