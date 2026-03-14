import type {TSESTree} from '@typescript-eslint/utils'

export function isInlineObjectType(
  node: TSESTree.Node,
): node is TSESTree.TSTypeLiteral {
  return node.type === 'TSTypeLiteral'
}

export function containsInlineObjectType(
  node: TSESTree.Node,
): TSESTree.TSTypeLiteral | null {
  if (isInlineObjectType(node)) {
    return node
  }

  if (
    node.type === 'TSUnionType'
    || node.type === 'TSIntersectionType'
  ) {
    for (const type of node.types) {
      const result = containsInlineObjectType(type)
      if (result)
        return result
    }
  }

  if (node.type === 'TSArrayType') {
    return containsInlineObjectType(node.elementType)
  }

  if ('typeParameters' in node && node.typeParameters) {
    for (const param of node.typeParameters.params) {
      const result = containsInlineObjectType(param)
      if (result)
        return result
    }
  }

  if (node.type === 'TSTypeAnnotation') {
    return containsInlineObjectType(node.typeAnnotation)
  }

  return null
}
