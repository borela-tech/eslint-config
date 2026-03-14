import {checkFunction} from './checkFunction'
import {messageIds} from './MessageIds'
import type {MessageId} from './MessageIds'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const functionParameterLineBreak: TSESLint.RuleModule<MessageId, Options> = {
  meta: {
    docs: {
      description: 'Enforce each function parameter to be on its own line when line exceeds max length',
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

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      FunctionDeclaration(node): void {
        checkFunction(sourceCode, context, node)
      },

      FunctionExpression(node): void {
        checkFunction(sourceCode, context, node)
      },

      ArrowFunctionExpression(node): void {
        if (node.expression)
          return

        checkFunction(sourceCode, context, node)
      },
    }
  },
}
