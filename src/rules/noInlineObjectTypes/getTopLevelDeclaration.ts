import type {TopLevelDeclaration} from './TopLevelDeclaration'
import type {TSESTree} from '@typescript-eslint/utils'

export function getTopLevelDeclaration(
  node: TSESTree.Node,
): TopLevelDeclaration | undefined {
  let current: TSESTree.Node | undefined = node
  const topLevelTypes = new Set([
    'ArrowFunctionExpression',
    'FunctionDeclaration',
    'FunctionExpression',
    'TSInterfaceDeclaration',
    'TSTypeAliasDeclaration',
    'VariableDeclaration',
  ])

  while (current) {
    if (topLevelTypes.has(current.type)) {
      const parent = current.parent
      const exported = parent?.type === 'ExportNamedDeclaration'

      if (exported && parent) {
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
