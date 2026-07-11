import * as path from 'path'
import {getExportedNames} from './getExportedNames'
import {isFileExempt} from './isFileExempt'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const exportFilenameMatch: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const fileName = context.filename
    const baseName = path.basename(fileName)
    const dotIndex = baseName.indexOf('.')

    const fileNameStem = dotIndex >= 0 ? baseName.slice(0, dotIndex) : baseName
    const stemSuffix = dotIndex >= 0 ? baseName.slice(dotIndex) : ''

    if (isFileExempt(fileName))
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

          if (exportName !== fileNameStem) {
            context.report({
              data: {
                currentName: baseName,
                expectedName: `${exportName}${stemSuffix}`,
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
