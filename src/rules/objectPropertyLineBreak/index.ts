import {checkObject} from './checkObject'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const objectPropertyLineBreak: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      ObjectExpression(node): void {
        checkObject(sourceCode, context, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce object literal formatting based on complexity and line length',
    },
    fixable: 'code',
    messages: messageIds,
    schema: [{
      additionalProperties: false,
      properties: {
        maxLength: {
          type: 'number',
        },
      },
      type: 'object',
    }],
    type: 'layout',
  },
}
