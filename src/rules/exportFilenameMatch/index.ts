import * as path from 'path'
import {getExportedNames} from './getExportedNames'
import {isExempt} from '../shared/isExempt'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const exportFilenameMatch: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const fileName = context.filename
    const baseName = path.basename(fileName)
    const ext = path.extname(baseName)
    const fileNameWithoutExt = baseName.slice(0, -ext.length)

    if (isExempt(fileName))
      return {}

    const exportNames: string[] = []

    return {
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        const names = getExportedNames(node)
        exportNames.push(...names)
      },

      'Program:exit'(programNode: TSESTree.Program): void {
        if (exportNames.length === 1) {
          const [exportName] = exportNames

          if (exportName !== fileNameWithoutExt) {
            context.report({
              data: {
                currentName: `${fileNameWithoutExt}${ext}`,
                expectedName: `${exportName}${ext}`,
              },
              messageId: 'filenameMismatch',
              node: programNode,
            })
          }
        }
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce filename matches the single named export.',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
