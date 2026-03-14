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

  inlineTypes.push({
    typeLiteral,
    annotationNode: node,
    location: result.node,
    insertLocation: result.insertLocation,
    isExported: result.isExported,
  })
}
