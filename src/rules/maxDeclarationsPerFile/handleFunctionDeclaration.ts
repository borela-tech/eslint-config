import {isTopLevel} from './isTopLevel'
import type {TSESTree} from '@typescript-eslint/utils'

export function handleFunctionDeclaration(
  node: TSESTree.FunctionDeclaration,
  functions: Set<string>,
): void {
  if (isTopLevel(node) && node.id?.name)
    functions.add(node.id.name)
}
