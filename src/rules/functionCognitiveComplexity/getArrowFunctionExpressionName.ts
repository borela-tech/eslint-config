import {getNameFromCallExpression} from './getNameFromCallExpression'
import {getNameFromProperty} from './getNameFromProperty'
import {getNameFromVariableDeclarator} from './getNameFromVariableDeclarator'
import type {TSESTree} from '@typescript-eslint/utils'

export function getArrowFunctionExpressionName(
  node: TSESTree.ArrowFunctionExpression,
): null | string {
  const parent = node.parent

  const nameFromVar = getNameFromVariableDeclarator(parent)
  if (nameFromVar)
    return nameFromVar

  const nameFromProp = getNameFromProperty(parent)
  if (nameFromProp)
    return nameFromProp

  const nameFromCall = getNameFromCallExpression(parent)
  if (nameFromCall)
    return nameFromCall

  return null
}
