import type {TSESTree} from '@typescript-eslint/types'

const componentFactoryNames = new Set(['forwardRef', 'memo'])

export function isReactComponentFactoryCall(
  expression: null | TSESTree.Expression,
): boolean {
  if (!expression || expression.type !== 'CallExpression')
    return false

  const callee = expression.callee
  if (callee.type === 'Identifier')
    return componentFactoryNames.has(callee.name)

  if (callee.type === 'MemberExpression') {
    return callee.property.type === 'Identifier'
      && componentFactoryNames.has(callee.property.name)
  }

  return false
}
