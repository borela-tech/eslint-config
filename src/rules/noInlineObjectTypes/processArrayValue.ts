import type {TSESTree} from '@typescript-eslint/utils'

export function processArrayValue(
  value: unknown,
  names: Set<string>,
  visit: (node: TSESTree.Node, names: Set<string>) => void,
): void {
  if (!Array.isArray(value))
    return

  for (const item of value) {
    if (typeof item === 'object' && item !== null && 'type' in item)
      visit(item as TSESTree.Node, names)
  }
}
