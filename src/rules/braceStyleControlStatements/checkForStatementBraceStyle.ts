import {reportBodyOnSameLineAsCondition} from './reportBodyOnSameLineAsCondition'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkForStatementBraceStyle(
  node: TSESTree.ForStatement,
  context: RuleContext,
): void {
  reportBodyOnSameLineAsCondition(context, node.body)
}
