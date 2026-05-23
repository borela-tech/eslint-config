import {isFilenameExempt} from './isFilenameExempt'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

function getFunctionName(node: TSESTree.ExportNamedDeclaration): null | string {
  const declaration = node.declaration
  if (declaration?.type === 'FunctionDeclaration')
    return declaration.id?.name ?? null
  if (declaration?.type === 'TSDeclareFunction')
    return declaration.id?.name ?? null
  return null
}

export const oneExportPerFile: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const filename = context.filename

    if (isFilenameExempt(filename))
      return {}

    let exportCount = 0
    const countedFunctionNames = new Set<string>()

    return {
      ExportDefaultDeclaration(_node: TSESTree.ExportDefaultDeclaration): void {
        exportCount++
      },

      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration): void {
        const functionName = getFunctionName(node)

        if (functionName !== null) {
          // Probably a function overload.
          if (countedFunctionNames.has(functionName))
            return

          countedFunctionNames.add(functionName)
          exportCount++
        } else
          // Not a function export, count as usual
          exportCount++
      },

      'Program:exit'(programNode: TSESTree.Program): void {
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
      description: 'Enforce single export per file.',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
