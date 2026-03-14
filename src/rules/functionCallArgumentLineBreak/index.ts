import {checkCall} from './checkCall'
import {messageIds} from './MessageIds'
import type {MessageId} from './MessageIds'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export const functionCallArgumentLineBreak: TSESLint.RuleModule<MessageId, Options> = {
  meta: {
    docs: {
      description: 'Enforce each function call argument to be on its own line when line exceeds max length',
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
      CallExpression(node): void {
        checkCall(sourceCode, context, node)
      },

      OptionalCallExpression(node): void {
        checkCall(sourceCode, context, node as TSESTree.CallExpression)
      },
    }
  },
}
