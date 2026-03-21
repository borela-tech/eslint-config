import type {TSESTree} from '@typescript-eslint/utils'

export function checkTypeParameters(
  node: TSESTree.Node,
  containsInline: (node: TSESTree.Node) => null | TSESTree.TSTypeLiteral,
): null | TSESTree.TSTypeLiteral {
  if (!('typeParameters' in node) || !node.typeParameters)
    return null

  for (const param of node.typeParameters.params) {
    const result = containsInline(param as TSESTree.Node)
    if (result)
      return result
  }
  return null
}
