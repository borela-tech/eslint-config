import {checkFunction} from './checkFunction'
import {messageIds} from './MessageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const singleLineFunctionParameters: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
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
      description: 'Enforce function parameters to be on a single line when they fit',
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
