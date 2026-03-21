import type {TSESTree} from '@typescript-eslint/utils'

export function getParameterNameFromIdentifier(
  parent: TSESTree.Node,
): string | undefined {
  const grandParent = parent.parent
  if (
    grandParent?.type === 'ArrowFunctionExpression'
    || grandParent?.type === 'FunctionDeclaration'
    || grandParent?.type === 'FunctionExpression'
  )
    return (parent as TSESTree.Identifier).name

  return undefined
}
