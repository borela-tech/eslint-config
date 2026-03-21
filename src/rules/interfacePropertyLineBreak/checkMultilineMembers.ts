import {formatTypeLiteral} from './formatTypeLiteral'
import {getLineIndent} from '../shared/getLineIndent'
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
      let fix: ((fixer: TSESLint.RuleFixer) => TSESLint.RuleFix) | undefined

      if (
        member.type === 'TSPropertySignature'
        && member.typeAnnotation
        && member.typeAnnotation.typeAnnotation.type === 'TSTypeLiteral'
      ) {
        const typeLiteral = member.typeAnnotation.typeAnnotation as TSESTree.TSTypeLiteral

        fix = (fixer): TSESLint.RuleFix => {
          const baseIndent = getLineIndent(sourceCode, memberLine)
          const formatted = formatTypeLiteral(
            sourceCode,
            typeLiteral,
            baseIndent,
          )
          return fixer.replaceText(typeLiteral, formatted)
        }
      }

      context.report({
        data: {maxLength},
        fix,
        loc: {
          end: {
            column: lineLength,
            line: memberLine,
          },
          start: {
            column: 0,
            line: memberLine,
          },
        },
        messageId: 'exceedsMaxLength',
      })
    }
  }
}
