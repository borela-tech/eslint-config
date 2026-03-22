import {isCamelCase} from './isCamelCase'
import {isUpperCase} from './isUpperCase'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkConstant(
  name: string,
  node: TSESTree.Identifier,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (!isCamelCase(name) && !isUpperCase(name)) {
    context.report({
      data: {name},
      messageId: 'notUpperCase',
      node,
    })
  }
}
