import {checkBlockStatement} from './checkBlockStatement'
import {checkNonBlockStatement} from './checkNonBlockStatement'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkIfStatement(
  node: TSESTree.IfStatement,
  context: RuleContext,
): void {
  // Check consequent (the main if body)
  if (node.consequent.type === 'BlockStatement')
    checkBlockStatement(node.consequent, context)
  else
    checkNonBlockStatement(node.consequent, context)

  // Check alternate (the else body)
  if (!node.alternate)
    return

  // Don't check else-if - let the nested IfStatement handle it
  if (node.alternate.type === 'IfStatement')
    return

  if (node.alternate.type === 'BlockStatement')
    checkBlockStatement(node.alternate, context)
  else
    checkNonBlockStatement(node.alternate, context)
}
