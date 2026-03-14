import type {TSESTree} from '@typescript-eslint/utils'

export function isNestedTypeAnnotation(node: TSESTree.TSTypeAnnotation) {
  let current = node.parent
  while (current) {
    if (current.type === 'TSTypeLiteral')
      return true
    if (
      current.type === 'TSPropertySignature'
      || current.type === 'TSUnionType'
      || current.type === 'TSIntersectionType'
      || current.type === 'TSArrayType'
      || current.type === 'TSTypeReference'
    ) {
      current = current.parent
      continue
    }
    break
  }
  return false
}
