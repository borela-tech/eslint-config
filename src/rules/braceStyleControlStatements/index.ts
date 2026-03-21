import {checkDoWhileStatementBraceStyle} from './checkDoWhileStatementBraceStyle'
import {checkForStatementBraceStyle} from './checkForStatementBraceStyle'
import {checkIfStatementBraceStyle} from './checkIfStatementBraceStyle'
import {checkWhileStatementBraceStyle} from './checkWhileStatementBraceStyle'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const braceStyleControlStatements: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      DoWhileStatement: node => checkDoWhileStatementBraceStyle(node, context),
      ForStatement: node => checkForStatementBraceStyle(node, context),
      IfStatement: node => checkIfStatementBraceStyle(node, context),
      WhileStatement: node => checkWhileStatementBraceStyle(node, context),
    }
  },
  meta: {
    docs: {
      description: 'Enforce control statements to have multi-line body.',
    },
    fixable: 'code',
    messages: {
      singleLine: 'Control statement body must be on a separate line',
    },
    schema: [],
    type: 'layout',
  },
}
