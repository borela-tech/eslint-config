import {checkPrecedingFieldSemicolon} from './checkPrecedingFieldSemicolon'
import {isComputedMember} from './isComputedMember'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const computedMemberSemicolon: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const sourceCode = context.sourceCode

    return {
      ClassBody(node: TSESTree.ClassBody): void {
        const body = node.body

        for (let i = 0; i < body.length; i++) {
          const member = body[i]
          if (!isComputedMember(member))
            continue

          checkPrecedingFieldSemicolon(
            context,
            sourceCode,
            i > 0 ? body[i - 1] : null,
          )
        }
      },
    }
  },

  meta: {
    docs: {
      description:
        'Require a semicolon after a field that precedes a computed class member.',
    },
    fixable: 'code',
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
