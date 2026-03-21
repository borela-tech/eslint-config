import type {TSESTree} from '@typescript-eslint/types'

type PrimitiveCheckable = TSESTree.Expression | TSESTree.PrivateIdentifier

function isPrimitiveExpression(node: PrimitiveCheckable): boolean {
  const type = node.type

  if (type === 'Literal')
    return true

  if (type === 'TemplateLiteral') {
    for (const expr of node.expressions) {
      if (!isPrimitiveExpression(expr as PrimitiveCheckable))
        return false
    }
    return true
  }

  if (type === 'UnaryExpression') {
    if (node.operator === '-' || node.operator === '+' || node.operator === '!') {
      return isPrimitiveExpression(node.argument as PrimitiveCheckable)
    }
  }

  if (type === 'BinaryExpression' || type === 'LogicalExpression')
    return isPrimitiveExpression(node.left as PrimitiveCheckable) && isPrimitiveExpression(node.right as PrimitiveCheckable)

  if (type === 'Identifier' || type === 'MemberExpression' || type === 'CallExpression')
    return true

  return false
}

export function isPrimitiveValue(node: TSESTree.Node | null | undefined): boolean {
  if (!node)
    return false

  if (node.type === 'ObjectExpression' || node.type === 'ArrayExpression')
    return false

  return isPrimitiveExpression(node as PrimitiveCheckable)
}
