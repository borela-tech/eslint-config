import {createFix} from './createFix'
import {isMultiline} from './isMultiline'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

type MessageIds = 'multiline'

export const singleLineReExports: TSESLint.RuleModule<MessageIds, []> = {
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
        node,
        messageId: 'multiline',
        fix: fixer => createFix(fixer, declaration, context.sourceCode),
      })
    }

    return {
      ExportNamedDeclaration: node =>
        checkDeclaration(node, node),
      ExportAllDeclaration: node =>
        checkDeclaration(node, node),
    }
  },
}
