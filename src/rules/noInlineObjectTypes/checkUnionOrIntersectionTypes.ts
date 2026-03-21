import type {TSESTree} from '@typescript-eslint/utils'

export function checkUnionOrIntersectionTypes(
  node: TSESTree.TSIntersectionType | TSESTree.TSUnionType,
  containsInline: (node: TSESTree.Node) => null | TSESTree.TSTypeLiteral,
): null | TSESTree.TSTypeLiteral {
  for (const type of node.types) {
    const result = containsInline(type)
    if (result)
      return result
  }
  return null
}
