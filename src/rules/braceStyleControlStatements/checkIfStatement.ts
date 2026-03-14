import {isOnSameLineAsCondition} from './isOnSameLineAsCondition'
import {reportIfOnSameLine} from './reportIfOnSameLine'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkIfStatement(
  node: TSESTree.IfStatement,
  context: RuleContext,
): void {
  const sourceCode = context.sourceCode
  reportIfOnSameLine(context, node.consequent)

  if (!node.alternate)
    return

  if (node.alternate.type === 'BlockStatement') {
    reportIfOnSameLine(context, node.alternate)
    return
  }

  if (node.alternate.type !== 'IfStatement') {
    if (isOnSameLineAsCondition(node.alternate, sourceCode))
      context.report({node: node.alternate, messageId: 'singleLine'})
  }
}
