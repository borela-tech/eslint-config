import {getComputedMemberName} from './getComputedMemberName'
import type {ClassMember} from '../shared/ClassMember'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'

export function checkMemberSemicolon(
  context: TSESLint.RuleContext<MessageId, []>,
  sourceCode: TSESLint.SourceCode,
  member: ClassMember,
): void {
  const tokenBefore = sourceCode.getTokenBefore(member)
  const hasLeadingSemicolon = tokenBefore?.value === ';'
    && tokenBefore.loc.end.line === member.loc.start.line

  if (hasLeadingSemicolon)
    return

  context.report({
    data: {
      name: getComputedMemberName(member, sourceCode),
    },
    fix(fixer) {
      return fixer.insertTextBefore(member, ';')
    },
    messageId: 'missingLeadingSemicolon',
    node: member,
  })
}
