import type {DeclarationNode} from './DeclarationNode'

export function getDeclarationName(node: DeclarationNode): null | string {
  if (node.type !== 'VariableDeclaration')
    return node.id?.name ?? null

  const declarations = node.declarations

  if (declarations.length === 1) {
    const id = declarations[0].id
    if (id.type === 'Identifier')
      return id.name
  }

  return null
}
