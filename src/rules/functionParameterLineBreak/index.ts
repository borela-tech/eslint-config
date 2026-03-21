import {checkFunction} from './checkFunction'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const functionParameterLineBreak: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      ArrowFunctionExpression(node): void {
        if (node.expression)
          return

        checkFunction(sourceCode, context, node)
      },

      FunctionDeclaration(node): void {
        checkFunction(sourceCode, context, node)
      },

      FunctionExpression(node): void {
        checkFunction(sourceCode, context, node)
      },

      TSCallSignatureDeclaration(node): void {
        checkFunction(sourceCode, context, node)
      },

      TSFunctionType(node): void {
        checkFunction(sourceCode, context, node)
      },

      TSMethodSignature(node): void {
        checkFunction(sourceCode, context, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce each function parameter to be on its own line when line exceeds max length.',
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
