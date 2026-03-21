import {getNameFromMethodDefinition} from './getNameFromMethodDefinition'
import {getNameFromProperty} from './getNameFromProperty'
import {getNameFromVariableDeclarator} from './getNameFromVariableDeclarator'
import type {TSESTree} from '@typescript-eslint/utils'

export function getFunctionExpressionName(
  node: TSESTree.FunctionExpression,
): null | string {
  const parent = node.parent

  const nameFromVar = getNameFromVariableDeclarator(parent)
  if (nameFromVar)
    return nameFromVar

  const nameFromProp = getNameFromProperty(parent)
  if (nameFromProp)
    return nameFromProp

  const nameFromMethod = getNameFromMethodDefinition(parent)
  if (nameFromMethod)
    return nameFromMethod

  return null
}
