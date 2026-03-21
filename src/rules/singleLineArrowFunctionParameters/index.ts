import {checkArrowFunction} from './checkArrowFunction'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const singleLineArrowFunctionParameters: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      ArrowFunctionExpression(node): void {
        if (node.params.length === 0)
          return

        checkArrowFunction(sourceCode, context, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce arrow function parameters to be on a single line when they fit.',
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
