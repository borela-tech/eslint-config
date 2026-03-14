import {isExempt} from './isExempt'
import {messageIds} from './MessageIds'
import type {MessageId} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const oneExportPerFile: TSESLint.RuleModule<MessageId, []> = {
  meta: {
    docs: {
      description: 'Enforce single export per file',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const filename = context.filename

    if (isExempt(filename))
      return {}

    let exportCount = 0

    return {
      ExportNamedDeclaration(node) {
        if ((node.exportKind as string) === 'type')
          return
        exportCount++
      },

      ExportDefaultDeclaration(node) {
        if ((node.exportKind as string) === 'type')
          return
        exportCount++
      },

      'Program:exit'(programNode) {
        if (exportCount > 1) {
          context.report({
            node: programNode,
            messageId: 'tooManyExports',
            data: {count: exportCount},
          })
        }
      },
    }
  },
}
