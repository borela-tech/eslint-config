import type {TSESTree} from '@typescript-eslint/utils'

export function getNameFromCallExpression(
  node: TSESTree.Node | undefined,
): null | string {
  if (node?.type === 'CallExpression' && node.callee?.type === 'Identifier')
    return `${node.callee.name} callback`

  return null
}
