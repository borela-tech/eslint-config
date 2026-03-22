import type {FunctionNode} from './FunctionNode'
import type {TSESTree} from '@typescript-eslint/types'

export function getFunctionNameForFixer(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
): string {
  if (node.type === 'FunctionDeclaration' && node.id)
    return node.id.name

  if (parent?.type === 'VariableDeclarator' && parent.id.type === 'Identifier')
    return parent.id.name

  return ''
}
