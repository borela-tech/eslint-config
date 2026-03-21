import type {TSESTree} from '@typescript-eslint/utils'

export function collectVariableDeclarators(
  node: TSESTree.VariableDeclaration,
  types: Set<string>,
): void {
  for (const declarator of node.declarations) {
    if (declarator.id.type === 'Identifier' && declarator.id.name)
      types.add(declarator.id.name)
  }
}
