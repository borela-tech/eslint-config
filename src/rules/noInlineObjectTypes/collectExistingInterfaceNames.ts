import type {TSESTree} from '@typescript-eslint/utils'

export function collectExistingInterfaceNames(
  nodes: TSESTree.Node[],
): Set<string> {
  const names = new Set<string>()

  function visit(node: TSESTree.Node) {
    if (node.type === 'TSInterfaceDeclaration') {
      const interfaceNode = node as TSESTree.TSInterfaceDeclaration
      names.add(interfaceNode.id.name)
    }

    for (const key in node) {
      const value = (node as unknown as Record<string, unknown>)[key]
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          for (const item of value) {
            if (item && typeof item === 'object' && 'type' in item)
              visit(item as TSESTree.Node)
          }
        } else if ('type' in value)
          visit(value as TSESTree.Node)
      }
    }
  }

  for (const node of nodes) {
    visit(node)
  }

  return names
}
