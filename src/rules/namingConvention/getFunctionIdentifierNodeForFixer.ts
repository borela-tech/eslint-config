import type {FunctionNode} from './FunctionNode'
import type {TSESTree} from '@typescript-eslint/types'

export function getFunctionIdentifierNodeForFixer(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
): null | TSESTree.Node {
  if (node.type === 'FunctionDeclaration')
    return node.id

  if (parent?.type === 'VariableDeclarator')
    return parent.id

  return null
}
