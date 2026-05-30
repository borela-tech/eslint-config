import type {TSESTree} from '@typescript-eslint/types'

export function isLiteralValue(expression: null | TSESTree.Expression) {
  if (!expression)
    return false

  if (expression.type === 'Literal')
    return true

  if (expression.type === 'TemplateLiteral')
    return expression.expressions.length === 0

  if (expression.type === 'Identifier' && expression.name === 'undefined')
    return true

  if (expression.type === 'UnaryExpression')
    return isLiteralValue(expression.argument)

  return false
}
