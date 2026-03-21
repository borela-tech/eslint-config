import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const individualImports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      ImportDeclaration(node: TSESTree.ImportDeclaration): void {
        if (node.specifiers.length <= 1)
          return

        context.report({
          fix(fixer) {
            const source = node.source.raw
            const specifiers = node.specifiers
              .filter(s => s.type === 'ImportSpecifier')
              .map(s => `import {${s.local.name}} from ${source}`)
              .join('\n')
            return fixer.replaceText(node, specifiers)
          },
          messageId: 'individualImports',
          node,
        })
      },
    }
  },
  meta: {
    docs: {
      description: 'Enforce individual imports instead of grouped imports.',
    },
    fixable: 'code',
    messages: {
      individualImports: 'Use individual imports instead of grouped imports.',
    },
    schema: [],
    type: 'suggestion',
  },
}
