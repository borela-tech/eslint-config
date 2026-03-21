import type {TSESTree} from '@typescript-eslint/utils'

const INCREMENTABLE_TYPES = new Set([
  'ConditionalExpression',
  'DoWhileStatement',
  'ForInStatement',
  'ForOfStatement',
  'ForStatement',
  'IfStatement',
  'LogicalExpression',
  'SwitchStatement',
  'TryStatement',
  'WhileStatement',
])

export function isIncrementableControlFlow(node: TSESTree.Node): boolean {
  return INCREMENTABLE_TYPES.has(node.type)
}
