import type {TSESTree} from '@typescript-eslint/utils'

const declarerTypes = new Set([
  'ArrowFunctionExpression',
  'ClassDeclaration',
  'FunctionDeclaration',
  'FunctionExpression',
  'TSCallSignatureDeclaration',
  'TSConstructorType',
  'TSConstructSignatureDeclaration',
  'TSDeclareFunction',
  'TSFunctionType',
  'TSInterfaceDeclaration',
  'TSMethodSignature',
  'TSTypeAliasDeclaration',
])

export function getTypeParametersOf(
  node: TSESTree.Node,
): TSESTree.TSTypeParameterDeclaration | undefined {
  if (!declarerTypes.has(node.type))
    return undefined

  const declarer = node as unknown as {
    typeParameters?: TSESTree.TSTypeParameterDeclaration
  }
  return declarer.typeParameters
}
