import type {TSESTree} from '@typescript-eslint/utils'

export function isAncestorOf(
  ancestor: TSESTree.Node,
  node: TSESTree.Node,
): boolean {
  let current = node.parent as TSESTree.Node | undefined

  while (current) {
    if (current === ancestor)
      return true
    current = current.parent as TSESTree.Node | undefined
  }

  return false
}
