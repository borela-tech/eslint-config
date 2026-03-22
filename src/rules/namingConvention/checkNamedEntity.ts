import {isExempt} from './isExempt'
import {isPascalCase} from './isPascalCase'
import {toPascalCase} from './toPascalCase'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkNamedEntity(
  name: string,
  node: TSESTree.Identifier,
  type: string,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (isExempt(name))
    return

  if (!isPascalCase(name)) {
    context.report({
      data: {name, type},
      fix(fixer) {
        return fixer.replaceText(node, toPascalCase(name))
      },
      messageId: 'notPascalCase',
      node,
    })
  }
}
