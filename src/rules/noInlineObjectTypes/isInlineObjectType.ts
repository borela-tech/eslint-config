import type {TSESTree} from '@typescript-eslint/utils'

export function isInlineObjectType(
  node: TSESTree.Node,
): node is TSESTree.TSTypeLiteral {
  return node.type === 'TSTypeLiteral'
}
