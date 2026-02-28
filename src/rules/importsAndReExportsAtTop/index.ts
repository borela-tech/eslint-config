import {categorizeStatements} from './categorizeStatements'
import {findFirstIndices} from './findFirstIndices'
import {generateSortedText} from './generateSortedText'
import {hasViolation} from './hasViolation'
import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

export const importsAndReExportsAtTop: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce imports and re-exports at the top of the file',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      importsAndReExportsAtTop:
        'Imports and re-exports should be at the top of the file.',
    },
    schema: [],
  },

  create(context) {
    return {
      Program(node) {
        const statements = node.body as TSESTree.Statement[]
        const categories = categorizeStatements(statements)
        const indices = findFirstIndices(statements)

        if (!hasViolation(indices, categories))
          return

        context.report({
          node,
          messageId: 'importsAndReExportsAtTop',

          fix(fixer) {
            const sortedText = generateSortedText(context, categories)
            return fixer.replaceText(node, sortedText)
          },
        })
      },
    }
  },
}
