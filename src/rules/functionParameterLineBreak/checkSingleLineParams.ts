import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkSingleLineParams(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, Options>,
  params: TSESTree.Parameter[],
  parens:
  {
    openingParen: {value: string, loc: TSESTree.SourceLocation, range: [number, number]}
    closingParen: {value: string, loc: TSESTree.SourceLocation, range: [number, number]}
  },
  maxLength: number,
): void {
  const {openingParen, closingParen} = parens
  const lineLength = getLineLength(sourceCode, openingParen.loc.start.line)

  if (lineLength <= maxLength)
    return

  if (params.length === 1) {
    context.report({
      loc: {
        start: {line: openingParen.loc.start.line, column: 0},
        end: {line: closingParen.loc.end.line, column: lineLength},
      },
      messageId: 'exceedsMaxLength',
      data: {maxLength},
    })
    return
  }

  context.report({
    loc: {
      start: {line: openingParen.loc.start.line, column: 0},
      end: {line: closingParen.loc.end.line, column: lineLength},
    },
    messageId: 'multipleOnSameLine',
    data: {maxLength},
    fix: (fixer): TSESLint.RuleFix => {
      const indent = sourceCode.getText().match(/^[ \t]*/)?.[0] ?? ''

      const paramTexts = params.map(param => {
        const paramText = sourceCode.getText(param)
        const comma = sourceCode.getTokenAfter(param, token => token.value === ',')
        if (comma && comma.loc.end.line === param.loc.end.line)
          return paramText + ','
        return paramText
      })

      const fixed = `(\n${indent}  ${paramTexts.join(`\n${indent}  `)}\n${indent})`

      return fixer.replaceTextRange(
        [openingParen.range[0], closingParen.range[1]],
        fixed,
      )
    },
  })
}
