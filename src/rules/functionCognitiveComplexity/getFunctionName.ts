import {getArrowFunctionExpressionName} from './getArrowFunctionExpressionName'
import {getFunctionExpressionName} from './getFunctionExpressionName'
import type {TSESTree} from '@typescript-eslint/utils'

export function getFunctionName(
  node:
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression,
): null | string {
  if (node.type === 'FunctionDeclaration' && node.id?.name)
    return node.id.name

  if (node.type === 'FunctionExpression')
    return getFunctionExpressionName(node)

  if (node.type === 'ArrowFunctionExpression')
    return getArrowFunctionExpressionName(node)

  return null
}
