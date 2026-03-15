import {checkInterface} from './checkInterface'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export const interfacePropertyLineBreak: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      TSInterfaceDeclaration(node): void {
        checkInterface(sourceCode, context, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce each interface member to be on its own line when line exceeds max length',
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
