import type {TopLevelDeclaration} from './TopLevelDeclaration'
import type {TSESTree} from '@typescript-eslint/utils'

const exportNodeTypes = new Set([
  'ExportDefaultDeclaration',
  'ExportNamedDeclaration',
])

const exportParentTypes = new Set([
  'BlockStatement',
  'Program',
  'TSModuleBlock',
])

const statementParentTypes = new Set([
  'BlockStatement',
  'Program',
  'StaticBlock',
  'TSModuleBlock',
])

export function getTopLevelDeclaration(
  node: TSESTree.Node,
): TopLevelDeclaration | undefined {
  let current: TSESTree.Node | undefined = node

  while (current) {
    if (exportNodeTypes.has(current.type)) {
      return {
        insertLocation: current,
        isExported: true,
        node: current,
      }
    }

    const parent = current.parent
    if (!parent)
      return undefined

    if (statementParentTypes.has(parent.type)) {
      return {
        insertLocation: current,
        isExported: false,
        node: current,
      }
    }

    if (isExportedStatement(parent)) {
      return {
        insertLocation: parent,
        isExported: true,
        node: current,
      }
    }

    current = parent as TSESTree.Node | undefined
  }

  return undefined
}

function isExportedStatement(parent: TSESTree.Node): boolean {
  if (!exportNodeTypes.has(parent.type))
    return false

  const grandparent = parent.parent
  return !!grandparent && exportParentTypes.has(grandparent.type)
}
