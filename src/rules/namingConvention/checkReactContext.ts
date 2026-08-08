import {isExempt} from './isExempt'
import {isPascalCase} from './isPascalCase'
import {toPascalCase} from './toPascalCase'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkReactContext(
  name: string,
  node: TSESTree.Identifier,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (isExempt(name))
    return

  if (!isPascalCase(name)) {
    context.report({
      data: {
        name,
        type: 'Context',
      },
      fix(fixer) {
        return fixer.replaceText(node, toPascalCase(name))
      },
      messageId: 'notPascalCase',
      node,
    })
  }
}
