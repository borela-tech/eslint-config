import type {TSESTree} from '@typescript-eslint/utils'

export function getParameterNameFromObjectPattern(
  parent: TSESTree.Node,
): string | undefined {
  const grandParent = parent.parent
  if (
    grandParent?.type === 'ArrowFunctionExpression'
    || grandParent?.type === 'FunctionDeclaration'
    || grandParent?.type === 'FunctionExpression'
  )
    return 'Options'

  return undefined
}
