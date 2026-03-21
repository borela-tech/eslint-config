import {isTopLevel} from './isTopLevel'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleTSDeclareFunction(
  node: TSESTree.TSDeclareFunction,
  functions: Set<string>,
): void {
  if (isTopLevel(node) && node.id?.name)
    functions.add(node.id.name)
}
