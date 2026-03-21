import {createFix} from './createFix'
import {isMultiline} from './isMultiline'
import type {MessageIds} from './MessageIds'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const singleLineReExports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    const checkDeclaration = (
      node: TSESTree.Node,
      declaration: ReExportDeclaration,
    ) => {
      // Skip local exports (only process re-exports with a source)
      if (!declaration.source)
        return

      if (!isMultiline(declaration))
        return

      context.report({
        fix: fixer => createFix(fixer, declaration, context.sourceCode),
        messageId: 'multiline',
        node,
      })
    }

    return {
      ExportAllDeclaration: node =>
        checkDeclaration(node, node),
      ExportNamedDeclaration: node =>
        checkDeclaration(node, node),
    }
  },

  meta: {
    docs: {
      description: 'Enforce re-exports to be on a single line',
    },
    fixable: 'code',
    messages: {
      multiline: 'Re-export should be on a single line',
    },
    schema: [],
    type: 'layout',
  },
}
