import {checkTypeParameters} from './checkTypeParameters'
import {checkUnionOrIntersectionTypes} from './checkUnionOrIntersectionTypes'
import {isInlineObjectType} from './isInlineObjectType'
import type {TSESTree} from '@typescript-eslint/utils'

export function containsInlineObjectType(
  node: TSESTree.Node,
): null | TSESTree.TSTypeLiteral {
  if (isInlineObjectType(node))
    return node

  if (node.type === 'TSIntersectionType' || node.type === 'TSUnionType') {
    const result = checkUnionOrIntersectionTypes(
      node as TSESTree.TSIntersectionType | TSESTree.TSUnionType,
      containsInlineObjectType,
    )
    if (result)
      return result
  }

  if (node.type === 'TSArrayType')
    return containsInlineObjectType(node.elementType)

  const typeParamResult = checkTypeParameters(node, containsInlineObjectType)
  if (typeParamResult)
    return typeParamResult

  if (node.type === 'TSTypeAnnotation')
    return containsInlineObjectType(node.typeAnnotation)

  return null
}
