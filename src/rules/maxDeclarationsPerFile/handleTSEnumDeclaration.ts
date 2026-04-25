import {isExportedDeclaration} from './isExportedDeclaration'
import {isTopLevel} from './isTopLevel'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleTSEnumDeclaration(
  node: TSESTree.TSEnumDeclaration,
  types: Set<string>,
): void {
  if (!isTopLevel(node))
    return

  if (!isExportedDeclaration(node.parent))
    return

  if (node.id?.name)
    types.add(node.id.name)
}
