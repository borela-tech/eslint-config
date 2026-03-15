import {isExempt} from '../shared/isExempt'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'

export const oneExportPerFile: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const filename = context.filename

    if (isExempt(filename))
      return {}

    let exportCount = 0

    return {
      ExportDefaultDeclaration(_node) {
        exportCount++
      },

      ExportNamedDeclaration(_node) {
        exportCount++
      },

      'Program:exit'(programNode) {
        if (exportCount > 1) {
          context.report({
            data: {count: exportCount},
            messageId: 'tooManyExports',
            node: programNode,
          })
        }
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce single export per file',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
