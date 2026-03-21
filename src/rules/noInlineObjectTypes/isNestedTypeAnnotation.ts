import {isIdentifierInFunction} from './isIdentifierInFunction'
import {isPropertySignatureInTypeLiteral} from './isPropertySignatureInTypeLiteral'
import {traverseUpForTypeLiteral} from './traverseUpForTypeLiteral'
import type {TSESTree} from '@typescript-eslint/utils'

export function isNestedTypeAnnotation(
  node: TSESTree.TSTypeAnnotation,
): boolean | undefined {
  const parent = node.parent

  if (isPropertySignatureInTypeLiteral(parent))
    return true

  if (isIdentifierInFunction(parent))
    return false

  if (
    parent?.type === 'ArrowFunctionExpression'
    || parent?.type === 'FunctionDeclaration'
    || parent?.type === 'FunctionExpression'
  )
    return false

  const foundTypeLiteral = traverseUpForTypeLiteral(parent)
  return foundTypeLiteral
}
