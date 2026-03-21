import {checkBlockStatement} from './checkBlockStatement'
import {checkNonBlockStatement} from './checkNonBlockStatement'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkForOfStatement(
  node: TSESTree.ForOfStatement,
  context: RuleContext,
): void {
  if (node.body.type === 'BlockStatement')
    checkBlockStatement(node.body, context)
  else
    checkNonBlockStatement(node.body, context)
}
