import {reportIfOnSameLine} from './reportIfOnSameLine'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkForStatement(
  node: TSESTree.ForStatement,
  context: RuleContext,
): void {
  reportIfOnSameLine(context, node.body)
}
