import {isTopLevel} from './isTopLevel'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleClassDeclaration(
  node: TSESTree.ClassDeclaration,
  functions: Set<string>,
): void {
  if (isTopLevel(node) && node.id?.name)
    functions.add(node.id.name)
}
