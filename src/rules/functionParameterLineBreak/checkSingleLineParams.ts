import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {Parens} from './Parens'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkSingleLineParams(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  params: TSESTree.Parameter[],
  parens: Parens,
  maxLength: number,
): void {
  const {closingParen, openingParen} = parens
  const lineLength = getLineLength(sourceCode, openingParen.loc.start.line)

  if (lineLength <= maxLength)
    return

  if (params.length === 1) {
    context.report({
      data: {maxLength},
      loc: {
        end: {
          column: lineLength,
          line: closingParen.loc.end.line,
        },
        start: {
          column: 0,
          line: openingParen.loc.start.line,
        },
      },
      messageId: 'exceedsMaxLength',
    })
    return
  }

  context.report({
    data: {maxLength},
    fix: (fixer): TSESLint.RuleFix => {
      const indent = sourceCode.getText().match(/^[\t ]*/)?.[0] ?? ''

      const paramTexts = params.map(param => {
        const paramText = sourceCode.getText(param)
        const comma = sourceCode.getTokenAfter(
          param,
          token => token.value === ',',
        )
        if (comma && comma.loc.end.line === param.loc.end.line)
          return paramText + ','
        return paramText
      })

      const fixed = [
        '(\n',
        `${indent}  ${paramTexts.join(`\n${indent}  `)}\n`,
        `${indent})`,
      ].join('')

      return fixer.replaceTextRange(
        [openingParen.range[0], closingParen.range[1]],
        fixed,
      )
    },
    loc: {
      end: {
        column: lineLength,
        line: closingParen.loc.end.line,
      },
      start: {
        column: 0,
        line: openingParen.loc.start.line,
      },
    },
    messageId: 'multipleOnSameLine',
  })
}
