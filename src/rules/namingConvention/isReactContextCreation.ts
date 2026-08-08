import type {TSESTree} from '@typescript-eslint/types'

export function isReactContextCreation(
  expression: null | TSESTree.Expression,
): boolean {
  if (!expression || expression.type !== 'CallExpression')
    return false

  const callee = expression.callee
  if (callee.type === 'Identifier')
    return callee.name === 'createContext'

  if (callee.type === 'MemberExpression')
    return callee.property.type === 'Identifier' && callee.property.name === 'createContext'

  return false
}
