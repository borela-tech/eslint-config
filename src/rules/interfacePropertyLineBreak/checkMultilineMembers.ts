import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkMultilineMembers(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  members: TSESTree.TSInterfaceBody['body'],
  maxLength: number,
): void {
  for (const member of members) {
    const memberLine = member.loc.start.line
    const lineLength = getLineLength(sourceCode, memberLine)

    if (lineLength > maxLength) {
      context.report({
        data: {maxLength},
        loc: {
          end: {column: lineLength, line: memberLine},
          start: {column: 0, line: memberLine},
        },
        messageId: 'exceedsMaxLength',
      })
    }
  }
}
