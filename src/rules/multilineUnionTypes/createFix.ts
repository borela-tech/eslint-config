import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function createFix(
  fixer: TSESLint.RuleFixer,
  node: TSESTree.TSUnionType,
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const types = node.types.map(t => sourceCode.getText(t))
  const formattedTypes = types.map(t => `  | ${t}`).join('\n')
  const result = `\n${formattedTypes}`
  return fixer.replaceText(node, result)
}
