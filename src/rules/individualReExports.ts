import type {MessageIds} from './individualReExports/MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const individualReExports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (!node.source || node.specifiers.length <= 1)
          return

        context.report({
          fix(fixer) {
            const source = node.source.value
            const typeKeyword = node.exportKind === 'type'
              ? 'type '
              : ''
            const specifiers = node.specifiers
              .map(s => {
                const localName = s.local.type === 'Identifier'
                  ? s.local.name
                  : s.local.value
                const exportedName = s.exported.type === 'Identifier'
                  ? s.exported.name
                  : s.exported.value
                const name = localName === exportedName
                  ? localName
                  : `${localName} as ${exportedName}`
                return `export ${typeKeyword}{${name}} from '${source}'`
              })
              .join('\n')
            return fixer.replaceText(node, specifiers)
          },
          messageId: 'individualReExports',
          node,
        })
      },
    }
  },
  meta: {
    docs: {
      description: 'Enforce individual exports instead of grouped exports',
    },
    fixable: 'code',
    messages: {
      individualReExports: 'Use individual exports instead of grouped exports.',
    },
    schema: [],
    type: 'suggestion',
  },
}
