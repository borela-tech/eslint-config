import {createFix} from './createFix'
import {isMultiline} from './isMultiline'
import type {TSESLint} from '@typescript-eslint/utils'

type MessageIds = 'multiline'

export const singleLineImports: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    docs: {
      description: 'Enforce imports to be on a single line',
    },
    fixable: 'code',
    messages: {
      multiline: 'Import should be on a single line',
    },
    schema: [],
    type: 'layout',
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (!isMultiline(node))
          return

        context.report({
          node,
          messageId: 'multiline',
          fix: fixer => createFix(fixer, node, context.sourceCode),
        })
      },
    }
  },
}
