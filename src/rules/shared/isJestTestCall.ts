import type {TSESTree} from '@typescript-eslint/types'

const JEST_FUNCTIONS = new Set([
  'describe',
  'fdescribe',
  'fit',
  'it',
  'test',
  'xdescribe',
  'xit',
  'xtest',
])

const JEST_MODIFIERS = new Set([
  'concurrent',
  'each',
  'failing',
  'only',
  'sequential',
  'skip',
  'todo',
])

function isJestIdentifier(node: TSESTree.Node, names: Set<string>): boolean {
  return node.type === 'Identifier' && names.has(node.name)
}

function isMemberJestCall(callee: TSESTree.Expression): boolean {
  if (callee.type !== 'MemberExpression')
    return false

  const object = (callee as TSESTree.MemberExpression).object
  const property = (callee as TSESTree.MemberExpression).property

  if (!isJestIdentifier(object as TSESTree.Node, JEST_FUNCTIONS))
    return false

  if (property.type !== 'Identifier')
    return false

  return JEST_MODIFIERS.has(property.name)
}

function isEachStyleCall(callee: TSESTree.Expression): boolean {
  // Handles describe.each(table)('desc', fn) -> outer CallExpression's callee is CallExpression
  if (callee.type !== 'CallExpression')
    return false

  const innerCallee = (callee as TSESTree.CallExpression).callee

  if (innerCallee.type === 'MemberExpression')
    return isMemberJestCall(innerCallee as TSESTree.Expression)

  if (innerCallee.type === 'CallExpression')
    return isEachStyleCall(innerCallee as TSESTree.Expression)

  return false
}

export function isJestTestCall(node: TSESTree.CallExpression): boolean {
  const callee = node.callee as TSESTree.Expression

  if (isJestIdentifier(callee, JEST_FUNCTIONS))
    return true

  if (isMemberJestCall(callee))
    return true

  if (isEachStyleCall(callee))
    return true

  return false
}
