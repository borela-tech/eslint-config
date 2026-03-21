import type {TSESTree} from '@typescript-eslint/utils'

export function getParameterNameFromFunction(
  parent: TSESTree.Node,
): string | undefined {
  if (
    parent.type === 'ArrowFunctionExpression'
    || parent.type === 'FunctionDeclaration'
    || parent.type === 'FunctionExpression'
  ) {
    const funcNode = parent as
      | TSESTree.ArrowFunctionExpression
      | TSESTree.FunctionDeclaration
      | TSESTree.FunctionExpression
    return funcNode.id?.name
  }

  return undefined
}
