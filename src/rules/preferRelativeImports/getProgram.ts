import {ESLintUtils} from '@typescript-eslint/utils'
import type {TSESLint} from '@typescript-eslint/utils'

export function getProgram(
  context: TSESLint.RuleContext<string, []>,
) {
  const services = ESLintUtils.getParserServices(context)
  return services.program
}
