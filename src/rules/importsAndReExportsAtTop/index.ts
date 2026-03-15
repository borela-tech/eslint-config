import {categorizeStatements} from './categorizeStatements'
import {findStatementIndices} from './findStatementIndices'
import {generateSortedText} from './generateSortedText'
import {hasViolation} from './hasViolation'
import type {TSESLint} from '@typescript-eslint/utils'

type MessageIds = 'importsAndReExportsAtTop'

export const importsAndReExportsAtTop: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      Program(node) {
        const statements = node.body
        const categories = categorizeStatements(statements)
        const indices = findStatementIndices(statements)

        if (!hasViolation(indices, categories))
          return

        context.report({
          fix(fixer) {
            const sortedText = generateSortedText(context, categories)
            return fixer.replaceText(node, sortedText)
          },
          messageId: 'importsAndReExportsAtTop',

          node,
        })
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce imports and re-exports at the top of the file',
    },
    fixable: 'code',
    messages: {
      importsAndReExportsAtTop:
        'Imports and re-exports should be at the top of the file.',
    },
    schema: [],
    type: 'suggestion',
  },
}
