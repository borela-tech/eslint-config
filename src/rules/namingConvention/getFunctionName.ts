import type {FunctionNode} from './FunctionNode'
import type {TSESTree} from '@typescript-eslint/types'

export function getFunctionName(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
): null | string {
  if (node.type === 'FunctionDeclaration' && node.id)
    return node.id.name

  if (
    (node.type === 'FunctionExpression'
      || node.type === 'ArrowFunctionExpression')
    && parent?.type === 'VariableDeclarator'
    && parent.id.type === 'Identifier'
  )
    return parent.id.name

  return null
}
