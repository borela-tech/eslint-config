import {isExempt} from './isExempt'
import {isPascalCase} from './isPascalCase'
import {toPascalCase} from './toPascalCase'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkClass(
  id: null | TSESTree.Identifier | undefined,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (!id)
    return

  const name = id.name

  if (isExempt(name))
    return

  if (!isPascalCase(name)) {
    context.report({
      data: {
        name,
        type: 'Class',
      },
      fix(fixer) {
        return fixer.replaceText(id, toPascalCase(name))
      },
      messageId: 'notPascalCase',
      node: id,
    })
  }
}
