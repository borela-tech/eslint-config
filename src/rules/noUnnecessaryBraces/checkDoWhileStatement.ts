import {checkBlockStatement} from './checkBlockStatement'
import {checkNonBlockStatement} from './checkNonBlockStatement'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkDoWhileStatement(
  node: TSESTree.DoWhileStatement,
  context: RuleContext,
): void {
  if (node.body.type === 'BlockStatement') {
    checkBlockStatement(node.body, context)
  } else {
    checkNonBlockStatement(node.body, context)
  }
}
