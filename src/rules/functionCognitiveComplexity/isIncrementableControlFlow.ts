import type {TSESTree} from '@typescript-eslint/utils'

export function isIncrementableControlFlow(node: TSESTree.Node): boolean {
  switch (node.type) {
  case 'ConditionalExpression':
  case 'DoWhileStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'ForStatement':
  case 'IfStatement':
  case 'LogicalExpression':
  case 'SwitchStatement':
  case 'TryStatement':
  case 'WhileStatement':
    return true
  default:
    return false
  }
}
