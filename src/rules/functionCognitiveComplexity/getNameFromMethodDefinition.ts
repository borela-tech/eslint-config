import type {TSESTree} from '@typescript-eslint/utils'

export function getNameFromMethodDefinition(
  node: TSESTree.Node | undefined,
): null | string {
  if (node?.type === 'MethodDefinition' && node.key?.type === 'Identifier')
    return node.key.name

  return null
}
