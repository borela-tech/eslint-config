import type {Rule} from 'eslint'

export const individualImports: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'Enforce individual imports instead of grouped imports',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      individualImports: 'Use individual imports instead of grouped imports.',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.specifiers.length <= 1)
          return

        context.report({
          node,
          messageId: 'individualImports',
          fix(fixer) {
            const source = node.source.raw
            const specifiers = node.specifiers
              .filter(s => s.type === 'ImportSpecifier')
              .map(s => `import {${s.local.name}} from ${source}`)
              .join('\n')
            return fixer.replaceText(node, specifiers)
          },
        })
      },
    }
  },
}
