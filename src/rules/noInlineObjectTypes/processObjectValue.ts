import type {TSESTree} from '@typescript-eslint/utils'

export function processObjectValue(
  value: unknown,
  names: Set<string>,
  visit: (node: TSESTree.Node, names: Set<string>) => void,
): void {
  if (Array.isArray(value))
    return

  if (typeof value === 'object' && value !== null && 'type' in value)
    visit(value as TSESTree.Node, names)
}
