import path from 'node:path'
import {getExportedNames} from './getExportedNames'
import {isExempt} from '../shared/isExempt'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'

export const exportFilenameMatch: TSESLint.RuleModule<MessageId, []> = {
  meta: {
    docs: {
      description: 'Enforce filename matches the single named export',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const filename = context.filename
    const basename = path.basename(filename)
    const extname = path.extname(basename)
    const expectedName = basename.slice(0, -extname.length)

    if (isExempt(filename))
      return {}

    const exportNames: string[] = []

    return {
      ExportNamedDeclaration(node) {
        if (node.exportKind === 'type')
          return

        const names = getExportedNames(node)
        exportNames.push(...names)
      },

      'Program:exit'(programNode) {
        if (exportNames.length === 1) {
          const [exportName] = exportNames

          if (exportName !== expectedName) {
            context.report({
              node: programNode,
              messageId: 'filenameMismatch',
              data: {filename: expectedName, exportName},
            })
          }
        }
      },
    }
  },
}
