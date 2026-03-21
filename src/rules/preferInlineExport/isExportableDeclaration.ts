import type {DeclarationNode} from './DeclarationNode'
import type {TSESTree} from '@typescript-eslint/types'

export function isExportableDeclaration(
  node: TSESTree.Node,
): node is DeclarationNode {
  const type = node.type
  return (
    type === 'TSInterfaceDeclaration'
    || type === 'TSTypeAliasDeclaration'
    || type === 'ClassDeclaration'
    || type === 'FunctionDeclaration'
    || type === 'VariableDeclaration'
  )
}
