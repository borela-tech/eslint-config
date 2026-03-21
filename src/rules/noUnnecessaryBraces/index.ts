import {checkDoWhileStatement} from './checkDoWhileStatement'
import {checkForInStatement} from './checkForInStatement'
import {checkForOfStatement} from './checkForOfStatement'
import {checkForStatement} from './checkForStatement'
import {checkIfStatement} from './checkIfStatement'
import {checkWhileStatement} from './checkWhileStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const noUnnecessaryBraces: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      DoWhileStatement: node => checkDoWhileStatement(node, context),
      ForInStatement: node => checkForInStatement(node, context),
      ForOfStatement: node => checkForOfStatement(node, context),
      ForStatement: node => checkForStatement(node, context),
      IfStatement: node => checkIfStatement(node, context),
      WhileStatement: node => checkWhileStatement(node, context),
    }
  },

  meta: {
    docs: {
      description:
        'Enforce consistent brace usage for single-statement control bodies.',
    },
    fixable: 'code',
    messages: {
      missingBraces: 'Multi-line statement must be wrapped in braces',
      unnecessaryBraces: 'Unnecessary braces around single-line statement',
    },
    schema: [],
    type: 'suggestion',
  },
}
