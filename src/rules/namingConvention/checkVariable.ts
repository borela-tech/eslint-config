import {isCamelCase} from './isCamelCase'
import {toCamelCase} from './toCamelCase'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkVariable(
  name: string,
  node: TSESTree.Identifier,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (!isCamelCase(name)) {
    context.report({
      data: {name},
      fix(fixer) {
        return fixer.replaceText(node, toCamelCase(name))
      },
      messageId: 'notCamelCase',
      node,
    })
  }
}
