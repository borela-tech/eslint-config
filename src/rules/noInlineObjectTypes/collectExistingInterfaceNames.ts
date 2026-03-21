import {visitNode} from './visitNode'
import type {TSESTree} from '@typescript-eslint/utils'

export function collectExistingInterfaceNames(
  nodes: TSESTree.Node[],
): Set<string> {
  const names = new Set<string>()

  for (const node of nodes) {
    visitNode(node, names)
  }

  return names
}
