import {isExportedDeclaration} from './isExportedDeclaration'
import {isTopLevel} from './isTopLevel'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleTSDeclareFunction(
  node: TSESTree.TSDeclareFunction,
  functions: Set<string>,
): void {
  if (!isTopLevel(node))
    return

  if (!isExportedDeclaration(node.parent))
    return

  if (node.id?.name)
    functions.add(node.id.name)
}
