import {checkDoWhileStatement} from './checkDoWhileStatement'
import {checkForStatement} from './checkForStatement'
import {checkIfStatement} from './checkIfStatement'
import {checkWhileStatement} from './checkWhileStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const noUnnecessaryBraces: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    docs: {
      description:
        'Enforce consistent brace usage for single-statement control bodies',
    },
    fixable: 'code',
    messages: {
      unnecessaryBraces: 'Unnecessary braces around single-line statement',
      missingBraces: 'Multi-line statement must be wrapped in braces',
    },
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    return {
      IfStatement: node => checkIfStatement(node, context),
      ForStatement: node => checkForStatement(node, context),
      WhileStatement: node => checkWhileStatement(node, context),
      DoWhileStatement: node => checkDoWhileStatement(node, context),
    }
  },
}
