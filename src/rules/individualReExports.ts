import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

export const individualReExports: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'Enforce individual exports instead of grouped exports',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      individualReExports: 'Use individual exports instead of grouped exports.',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        const exportNode = node as TSESTree.ExportNamedDeclaration
        if (!exportNode.source || exportNode.specifiers.length <= 1)
          return

        context.report({
          node,
          messageId: 'individualReExports',
          fix(fixer) {
            const source = exportNode.source!.value
            const typeKeyword = exportNode.exportKind === 'type'
              ? 'type '
              : ''
            const specifiers = exportNode.specifiers
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
        })
      },
    }
  },
}
