import type {TSESTree} from '@typescript-eslint/utils'

export function isTopLevel(node: TSESTree.Node): boolean {
  if (node.parent?.type === 'Program')
    return true
  if (
    node.parent?.type === 'ExportNamedDeclaration'
    && node.parent.parent?.type === 'Program'
  )
    return true
  return false
}
