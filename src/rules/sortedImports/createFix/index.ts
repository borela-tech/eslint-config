import {createFixForGroup} from './createFixForGroup'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function createImportFix(
  fixer: TSESLint.RuleFixer,
  importGroups: TSESTree.ImportDeclaration[][],
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix[] {
  const fixes: TSESLint.RuleFix[] = []

  for (const group of importGroups) {
    const fix = createFixForGroup(fixer, group, sourceCode)
    if (fix)
      fixes.push(fix)
  }

  return fixes
}
