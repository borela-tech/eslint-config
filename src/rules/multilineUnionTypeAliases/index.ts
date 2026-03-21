import {createFix} from './createFix'
import {isMultiline} from './isMultiline'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const multilineUnionTypeAliases: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      TSUnionType(node) {
        if (node.types.length < 2)
          return

        const parent = node.parent
        if (!parent || parent.type !== 'TSTypeAliasDeclaration')
          return

        const sourceCode = context.sourceCode
        const text = sourceCode.getText(node)

        if (text.trim().startsWith('|'))
          return

        if (!isMultiline(node)) {
          context.report({
            fix: fixer => createFix(fixer, node, sourceCode),
            messageId: 'singleLine',
            node,
          })
          return
        }

        context.report({
          fix: fixer => createFix(fixer, node, sourceCode),
          messageId: 'missingPipes',
          node,
        })
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce union type aliases with multiple members to be on multiple lines',
    },
    fixable: 'code',
    messages: {
      missingPipes: 'Multiline union type aliases should have leading pipes on each member',
      singleLine: 'Union type aliases with multiple members should be on multiple lines',
    },
    schema: [],
    type: 'layout',
  },
}
