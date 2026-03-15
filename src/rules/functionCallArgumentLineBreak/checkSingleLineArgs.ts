import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkSingleLineArgs(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, Options>,
  args: TSESTree.Node[],
  parens:
  {
    closingParen: {loc: TSESTree.SourceLocation, range: [number, number], value: string}
    openingParen: {loc: TSESTree.SourceLocation, range: [number, number], value: string}
  },
  maxLength: number,
): void {
  const {closingParen, openingParen} = parens
  const lineLength = getLineLength(sourceCode, openingParen.loc.start.line)

  if (lineLength <= maxLength)
    return

  if (args.length === 1) {
    context.report({
      data: {maxLength},
      loc: {
        end: {column: lineLength, line: closingParen.loc.end.line},
        start: {column: 0, line: openingParen.loc.start.line},
      },
      messageId: 'exceedsMaxLength',
    })
    return
  }

  context.report({
    data: {maxLength},
    fix: (fixer): TSESLint.RuleFix => {
      const indent = sourceCode.getText().match(/^[ \t]*/)?.[0] ?? ''

      const argTexts = args.map(arg => {
        const argText = sourceCode.getText(arg)
        const comma = sourceCode.getTokenAfter(arg, token => token.value === ',')
        if (comma && comma.loc.end.line === arg.loc.end.line)
          return argText + ','
        return argText
      })

      const fixed = `(\n${indent}  ${argTexts.join(`\n${indent}  `)}\n${indent})`

      return fixer.replaceTextRange(
        [openingParen.range[0], closingParen.range[1]],
        fixed,
      )
    },
    loc: {
      end: {column: lineLength, line: closingParen.loc.end.line},
      start: {column: 0, line: openingParen.loc.start.line},
    },
    messageId: 'multipleOnSameLine',
  })
}
