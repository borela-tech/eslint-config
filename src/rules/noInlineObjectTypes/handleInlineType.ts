import {getTopLevelDeclaration} from './getTopLevelDeclaration'
import type {InlineTypeEntry} from './InlineTypeEntry'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleInlineType(
  node: TSESTree.TSTypeAnnotation,
  typeLiteral: TSESTree.TSTypeLiteral,
  inlineTypes: InlineTypeEntry[],
): void {
  const result = getTopLevelDeclaration(node)
  if (!result)
    return

  let parameterName: string | undefined
  const parent = node.parent

  if (parent?.type === 'Identifier') {
    const grandParent = parent.parent
    if (
      grandParent?.type === 'FunctionDeclaration'
      || grandParent?.type === 'FunctionExpression'
      || grandParent?.type === 'ArrowFunctionExpression'
    )
      parameterName = parent.name
  } else if (parent?.type === 'ObjectPattern') {
    const grandParent = parent.parent
    if (
      grandParent?.type === 'FunctionDeclaration'
      || grandParent?.type === 'FunctionExpression'
      || grandParent?.type === 'ArrowFunctionExpression'
    )
      parameterName = 'Options'
  } else if (
    parent?.type === 'FunctionDeclaration'
    || parent?.type === 'FunctionExpression'
    || parent?.type === 'ArrowFunctionExpression'
  )
    parameterName = parent.id?.name

  inlineTypes.push({
    annotationNode: node,
    insertLocation: result.insertLocation,
    isExported: result.isExported,
    location: result.node,
    parameterName,
    typeLiteral,
  })
}
