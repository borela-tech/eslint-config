import type {TSESLint} from '@typescript-eslint/utils'

export function getFilePath(
  context: TSESLint.RuleContext<string, []>,
): string {
  return context.filename
}
