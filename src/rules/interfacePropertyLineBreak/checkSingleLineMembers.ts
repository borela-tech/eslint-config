import {getLineLength} from '../shared/getLineLength'
import type {Braces} from './Braces'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkSingleLineMembers(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  members: TSESTree.TSInterfaceBody['body'],
  parens: Braces,
  maxLength: number,
): void {
  const {closingBrace, openingBrace} = parens
  const lineLength = getLineLength(sourceCode, openingBrace.loc.start.line)

  if (lineLength <= maxLength)
    return

  if (members.length === 1) {
    context.report({
      data: {maxLength},
      loc: {
        end: {column: lineLength, line: closingBrace.loc.end.line},
        start: {column: 0, line: openingBrace.loc.start.line},
      },
      messageId: 'exceedsMaxLength',
    })
    return
  }

  context.report({
    data: {maxLength},
    fix: (fixer): TSESLint.RuleFix => {
      const indent = sourceCode.getText().match(/^[ \t]*/)?.[0] ?? ''

      const memberTexts = members.map((member, index) => {
        const memberText = sourceCode.getText(member).replace(/,\s*$/, '')
        const isLast = index === members.length - 1
        if (!isLast)
          return memberText + ','
        return memberText
      })

      const fixed = `{\n${indent}  ${memberTexts.join(`\n${indent}  `)}\n${indent}}`

      return fixer.replaceTextRange(
        [openingBrace.range[0], closingBrace.range[1]],
        fixed,
      )
    },
    loc: {
      end: {column: lineLength, line: closingBrace.loc.end.line},
      start: {column: 0, line: openingBrace.loc.start.line},
    },
    messageId: 'multipleOnSameLine',
  })
}
