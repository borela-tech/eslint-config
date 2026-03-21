import type {TSESTree} from '@typescript-eslint/utils'

export function getChildNodes(node: TSESTree.Node): TSESTree.Node[] {
  const children: TSESTree.Node[] = []

  for (const key of Object.keys(node)) {
    if (key === 'parent' || key === 'loc' || key === 'range')
      continue
    const value = (node as unknown as Record<string, unknown>)[key]
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== null && typeof item === 'object' && 'type' in item)
          children.push(item as TSESTree.Node)
      }
    } else if (value !== null && typeof value === 'object' && 'type' in value)
      children.push(value as TSESTree.Node)
  }

  return children
}
