import {checkArray} from './checkArray'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const arrayItemsLineBreak: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      ArrayExpression(node): void {
        checkArray(sourceCode, context, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce each array item to be on its own line when the array expression exceeds a configurable maximum line length.',
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
