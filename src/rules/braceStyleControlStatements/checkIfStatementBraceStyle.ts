import {createBraceStyleFix} from './createBraceStyleFix'
import {isOnSameLineAsCondition} from './isOnSameLineAsCondition'
import {reportBodyOnSameLineAsCondition} from './reportBodyOnSameLineAsCondition'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkIfStatementBraceStyle(
  node: TSESTree.IfStatement,
  context: RuleContext,
): void {
  const sourceCode = context.sourceCode
  reportBodyOnSameLineAsCondition(context, node.consequent)

  if (!node.alternate)
    return

  if (node.alternate.type === 'BlockStatement') {
    reportBodyOnSameLineAsCondition(context, node.alternate)
    return
  }

  if (node.alternate.type !== 'IfStatement') {
    const alternate = node.alternate
    if (isOnSameLineAsCondition(alternate, sourceCode)) {
      context.report({
        fix: fixer => createBraceStyleFix(fixer, alternate, sourceCode),
        messageId: 'singleLine',
        node: alternate,
      })
    }
  }
}
