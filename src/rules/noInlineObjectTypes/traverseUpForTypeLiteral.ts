import type {TSESTree} from '@typescript-eslint/utils'

export function traverseUpForTypeLiteral(
  current: TSESTree.Node | undefined,
): boolean {
  const skipTypes = new Set([
    'TSArrayType',
    'TSIntersectionType',
    'TSPropertySignature',
    'TSTypeReference',
    'TSUnionType',
  ])

  while (current) {
    if (current.type === 'TSTypeLiteral')
      return true
    if (skipTypes.has(current.type)) {
      current = current.parent
      continue
    }
    break
  }
  return false
}
