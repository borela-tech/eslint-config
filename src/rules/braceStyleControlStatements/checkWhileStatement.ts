import {reportIfOnSameLine} from './reportIfOnSameLine'
import type {RuleContext} from './RuleContext'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkWhileStatement(
  node: TSESTree.WhileStatement,
  context: RuleContext,
): void {
  reportIfOnSameLine(context, node.body)
}
