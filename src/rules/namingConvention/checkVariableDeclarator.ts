import {checkConstant} from './checkConstant'
import {checkReactComponent} from './checkReactComponent'
import {checkReactContext} from './checkReactContext'
import {checkVariable} from './checkVariable'
import {isExempt} from './isExempt'
import {isFunction} from './isFunction'
import {isLiteralValue} from './isLiteralValue'
import {isReactComponentFactoryCall} from './isReactComponentFactoryCall'
import {isReactContextCreation} from './isReactContextCreation'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkVariableDeclarator(
  node: TSESTree.VariableDeclarator,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  const id = node.id as TSESTree.Identifier
  const name = id.name

  if (isExempt(name))
    return

  // If this is a context, it should follow PascalCase.
  if (isReactContextCreation(node.init)) {
    checkReactContext(name, id, context)
    return
  }

  // If this is a function, it will be handled by the function handlers.
  if (isFunction(node.init))
    return

  // If this is a wrapped component (e.g. memo, forwardRef),
  // it should follow PascalCase. The inner function is handled
  // by the function handlers.
  if (isReactComponentFactoryCall(node.init)) {
    checkReactComponent(name, id, context)
    return
  }

  // Get the kind: const, let, var.
  const parent = node.parent
  if (parent?.type !== 'VariableDeclaration')
    return

  const kind = parent.kind
  if (kind === 'const') {
    if (isLiteralValue(node.init))
      checkConstant(name, id, context, true)
    else
      checkConstant(name, id, context)
  } else
    checkVariable(name, id, context)
}
