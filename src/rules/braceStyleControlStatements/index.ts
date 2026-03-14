import {checkDoWhileStatement} from './checkDoWhileStatement'
import {checkForStatement} from './checkForStatement'
import {checkIfStatement} from './checkIfStatement'
import {checkWhileStatement} from './checkWhileStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const braceStyleControlStatements: TSESLint.RuleModule<MessageIds, []> = {
  meta: {
    docs: {
      description: 'Enforce control statements to have multi-line body',
    },
    fixable: 'code',
    messages: {
      singleLine: 'Control statement body must be on a separate line',
    },
    schema: [],
    type: 'layout',
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
