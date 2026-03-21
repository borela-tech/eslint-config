import type {TSESTree} from '@typescript-eslint/utils'

export function getNameFromDeclaration(node: TSESTree.Node): string[] {
  const names: string[] = []

  switch (node.type) {
  case 'ClassDeclaration':
    if (node.id)
      names.push(node.id.name)
    break
  case 'FunctionDeclaration':
    if (node.id)
      names.push(node.id.name)
    break
  case 'TSInterfaceDeclaration':
    names.push(node.id.name)
    break
  case 'TSTypeAliasDeclaration':
    names.push(node.id.name)
    break
  case 'VariableDeclaration':
    for (const d of node.declarations) {
      if (d.id.type === 'Identifier')
        names.push(d.id.name)
    }
    break
  }

  return names
}
