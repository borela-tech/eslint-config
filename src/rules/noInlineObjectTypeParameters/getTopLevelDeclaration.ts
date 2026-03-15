import type {TSESTree} from '@typescript-eslint/utils'

interface TopLevelDeclaration {
  insertLocation: TSESTree.Node
  isExported: boolean
  node: TSESTree.Node
}

export function getTopLevelDeclaration(
  node: TSESTree.Node,
): TopLevelDeclaration | undefined {
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
          insertLocation: parent,
          isExported: true,
          node: current,
        }
      }

      return {
        insertLocation: current,
        isExported: false,
        node: current,
      }
    }
    current = current.parent as TSESTree.Node | undefined
  }

  return undefined
}
