import type {TSESTree} from '@typescript-eslint/utils'

export function isNodeWithType(value: unknown): value is TSESTree.Node {
  return value !== null && typeof value === 'object' && 'type' in value
}
