import {checkConstant} from './checkConstant'
import {checkVariable} from './checkVariable'
import {isExempt} from './isExempt'
import {isFunction} from './isFunction'
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

  // If this is a function, it will be handled by the function handlers.
  if (isFunction(node.init))
    return

  // Get the kind: const, let, var.
  const parent = node.parent
  if (parent?.type !== 'VariableDeclaration')
    return

  const kind = parent.kind
  if (kind === 'const')
    checkConstant(name, id, context)
  else
    checkVariable(name, id, context)
}
