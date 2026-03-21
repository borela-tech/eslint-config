import {createFix} from './createFix'
import {isMultiline} from './isMultiline'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const singleLineImports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      ImportDeclaration(node) {
        if (!isMultiline(node))
          return

        context.report({
          fix: fixer => createFix(fixer, node, context.sourceCode),
          messageId: 'multiline',
          node,
        })
      },
    }
  },

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
}
