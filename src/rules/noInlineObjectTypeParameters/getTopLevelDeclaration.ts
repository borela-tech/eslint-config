import type {TSESTree} from '@typescript-eslint/utils'

export function getTopLevelDeclaration(
  node: TSESTree.Node,
): {
  node: TSESTree.Node
  insertLocation: TSESTree.Node
  isExported: boolean
} | undefined {
  let current: TSESTree.Node | undefined = node
  while (current) {
    if (
      current.type === 'FunctionDeclaration'
      || current.type === 'FunctionExpression'
      || current.type === 'ArrowFunctionExpression'
      || current.type === 'VariableDeclaration'
      || current.type === 'TSInterfaceDeclaration'
      || current.type === 'TSTypeAliasDeclaration'
    ) {
      const parent = current.parent
      const isExported = parent?.type === 'ExportNamedDeclaration'

      if (isExported && parent) {
        return {
          node: current,
          insertLocation: parent,
          isExported: true,
        }
      }

      return {
        node: current,
        insertLocation: current,
        isExported: false,
      }
    }
    current = current.parent as TSESTree.Node | undefined
  }
  return undefined
}
