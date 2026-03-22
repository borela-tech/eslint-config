import type {TSESTree} from '@typescript-eslint/types'

export function isFunction(init: null | TSESTree.Expression): boolean {
  if (!init)
    return false
  return init.type === 'FunctionExpression'
    || init.type === 'ArrowFunctionExpression'
}
