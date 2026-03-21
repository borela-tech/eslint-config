import type {TSESTree} from '@typescript-eslint/utils'

export function isNestedTypeAnnotation(node: TSESTree.TSTypeAnnotation) {
  const parent = node.parent

  if (
    parent?.type === 'TSPropertySignature'
    && (
      parent.parent?.type === 'TSTypeLiteral'
      || parent.parent?.type === 'TSInterfaceBody'
    )
  )
    return true

  if (
    parent?.type === 'Identifier'
    && (
      parent.parent?.type === 'FunctionDeclaration'
      || parent.parent?.type === 'FunctionExpression'
      || parent.parent?.type === 'ArrowFunctionExpression'
    )
  )
    return false

  if (
    parent?.type === 'FunctionDeclaration'
    || parent?.type === 'FunctionExpression'
    || parent?.type === 'ArrowFunctionExpression'
  )
    return false

  let current: TSESTree.Node | undefined = parent
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
