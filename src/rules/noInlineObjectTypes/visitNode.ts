import {processArrayValue} from './processArrayValue'
import {processObjectValue} from './processObjectValue'
import type {TSESTree} from '@typescript-eslint/utils'

export function visitNode(node: TSESTree.Node, names: Set<string>): void {
  if (node.type === 'TSInterfaceDeclaration') {
    const interfaceNode = node as TSESTree.TSInterfaceDeclaration
    names.add(interfaceNode.id.name)
  }

  for (const key in node) {
    const value = (node as unknown as Record<string, unknown>)[key]
    if (value && typeof value === 'object') {
      processArrayValue(value, names, visitNode)
      processObjectValue(value, names, visitNode)
    }
  }
}
