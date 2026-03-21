import {createReExportFix} from './createReExportFix'
import {isMultilineReExport} from './isMultilineReExport'
import type {MessageIds} from './MessageIds'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const singleLineReExports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    const checkDeclaration = (
      node: TSESTree.Node,
      declaration: ReExportDeclaration,
    ): void => {
      // Skip local exports (only process re-exports with a source)
      if (!declaration.source)
        return

      if (!isMultilineReExport(declaration))
        return

      context.report({
        fix: fixer => createReExportFix(fixer, declaration, context.sourceCode),
        messageId: 'multiline',
        node,
      })
    }

    return {
      ExportAllDeclaration: (node: TSESTree.ExportAllDeclaration): void => {
        checkDeclaration(node, node)
      },
      ExportNamedDeclaration: (node: TSESTree.ExportNamedDeclaration): void => {
        checkDeclaration(node, node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce re-exports to be on a single line.',
    },
    fixable: 'code',
    messages: {
      multiline: 'Re-export should be on a single line',
    },
    schema: [],
    type: 'layout',
  },
}
