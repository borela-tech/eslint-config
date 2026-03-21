import {checkObjectExpression} from './checkObjectExpression'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export const braceStyleObjectLiteral: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      ObjectExpression(node: TSESTree.ObjectExpression): void {
        checkObjectExpression(sourceCode, context, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce consistent brace positioning for object literals.',
    },
    fixable: 'code',
    messages: messageIds,
    schema: [{
      additionalProperties: false,
      properties: {},
      type: 'object',
    }],
    type: 'layout',
  },
}
