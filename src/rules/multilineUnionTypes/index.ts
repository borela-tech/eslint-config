import {createFix} from './createFix'
import {isMultiline} from './isMultiline'
import type {TSESLint} from '@typescript-eslint/utils'

type MessageIds =
  | 'singleLine'
  | 'missingPipes'

export const multilineUnionTypes: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    docs: {
      description: 'Enforce union types with multiple members to be on multiple lines',
    },
    fixable: 'code',
    messages: {
      singleLine: 'Union types with multiple members should be on multiple lines',
      missingPipes: 'Multiline union types should have leading pipes on each member',
    },
    schema: [],
    type: 'layout',
  },

  create(context) {
    return {
      TSUnionType(node) {
        if (node.types.length < 2)
          return

        const sourceCode = context.sourceCode
        const text = sourceCode.getText(node)

        if (text.trim().startsWith('|'))
          return

        if (!isMultiline(node)) {
          context.report({
            node,
            messageId: 'singleLine',
            fix: fixer => createFix(fixer, node, sourceCode),
          })
          return
        }

        context.report({
          node,
          messageId: 'missingPipes',
          fix: fixer => createFix(fixer, node, sourceCode),
        })
      },
    }
  },
}
