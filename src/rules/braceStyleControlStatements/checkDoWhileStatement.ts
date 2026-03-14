import {reportIfOnSameLine} from './reportIfOnSameLine'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkDoWhileStatement(
  node: TSESTree.DoWhileStatement,
  context: RuleContext,
): void {
  reportIfOnSameLine(context, node.body)
}
