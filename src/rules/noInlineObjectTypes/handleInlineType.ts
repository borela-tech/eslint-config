import {getParameterNameFromFunction} from './getParameterNameFromFunction'
import {getParameterNameFromIdentifier} from './getParameterNameFromIdentifier'
import {getParameterNameFromObjectPattern} from './getParameterNameFromObjectPattern'
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

  if (parent?.type === 'Identifier')
    parameterName = getParameterNameFromIdentifier(parent)
  else if (parent?.type === 'ObjectPattern')
    parameterName = getParameterNameFromObjectPattern(parent)
  else
    parameterName = getParameterNameFromFunction(parent)

  inlineTypes.push({
    annotationNode: node,
    insertLocation: result.insertLocation,
    isExported: result.isExported,
    location: result.node,
    parameterName,
    typeLiteral,
  })
}
