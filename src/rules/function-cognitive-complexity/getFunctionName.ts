import type {TSESTree} from '@typescript-eslint/utils'

export function getFunctionName(
  node:
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression,
): null | string {
  if (node.type === 'FunctionDeclaration' && node.id?.name)
    return node.id.name

  if (node.type === 'FunctionExpression') {
    const parent = node.parent

    if (parent?.type === 'VariableDeclarator' && parent.id?.type === 'Identifier')
      return parent.id.name

    if (parent?.type === 'Property' && parent.key?.type === 'Identifier')
      return parent.key.name

    if (parent?.type === 'MethodDefinition' && parent.key?.type === 'Identifier')
      return parent.key.name
  }

  if (node.type === 'ArrowFunctionExpression') {
    const parent = node.parent

    if (parent?.type === 'VariableDeclarator' && parent.id?.type === 'Identifier')
      return parent.id.name

    if (parent?.type === 'Property' && parent.key?.type === 'Identifier')
      return parent.key.name

    if (parent?.type === 'CallExpression' && parent.callee?.type === 'Identifier')
      return `${parent.callee.name} callback`
  }

  return null
}
