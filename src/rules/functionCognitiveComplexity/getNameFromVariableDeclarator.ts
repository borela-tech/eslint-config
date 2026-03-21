import type {TSESTree} from '@typescript-eslint/utils'

export function getNameFromVariableDeclarator(
  node: TSESTree.Node | undefined,
): null | string {
  if (node?.type === 'VariableDeclarator' && node.id?.type === 'Identifier')
    return node.id.name

  return null
}
