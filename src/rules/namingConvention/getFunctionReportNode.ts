import type {FunctionNode} from './FunctionNode'
import type {TSESTree} from '@typescript-eslint/types'

export function getFunctionReportNode(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
): TSESTree.Node {
  if (node.type === 'FunctionDeclaration')
    return node
  return parent ?? node
}
