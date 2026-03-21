import type {TSESTree} from '@typescript-eslint/utils'

export function getNameFromProperty(
  node: TSESTree.Node | undefined,
): null | string {
  if (node?.type === 'Property' && node.key?.type === 'Identifier')
    return node.key.name

  return null
}
