import {isTopLevel} from './isTopLevel'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleTSTypeAliasDeclaration(
  node: TSESTree.TSTypeAliasDeclaration,
  types: Set<string>,
): void {
  if (isTopLevel(node) && node.id?.name)
    types.add(node.id.name)
}
