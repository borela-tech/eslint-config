import {findLinesWithMultipleNodes} from '../shared/findLinesWithMultipleNodes'
import {formatParams} from './formatParams'
import {getLineLength} from '../shared/getLineLength'
import {getLineStartIndex} from '../shared/getLineStartIndex'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {Parens} from './Parens'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkMultilineParams(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  params: TSESTree.Parameter[],
  parens: Parens,
  maxLength: number,
): void {
  const linesWithMultipleParams = findLinesWithMultipleNodes(params)

  for (const line of linesWithMultipleParams) {
    const lineLength = getLineLength(sourceCode, line)

    if (lineLength > maxLength) {
      context.report({
        data: {maxLength},
        fix: (fixer): TSESLint.RuleFix => {
          const nodesOnLine = params.filter(
            param =>
              param.loc.start.line <= line && param.loc.end.line >= line,
          )
          const lastNode = nodesOnLine[nodesOnLine.length - 1]
          const lineStartIndex = getLineStartIndex(sourceCode, line)
          const baseIndent = sourceCode.getText().match(/^[\t ]*/)?.[0] ?? ''
          const indent = baseIndent + '  '
          const fixed = formatParams(sourceCode, nodesOnLine, indent)
          return fixer.replaceTextRange(
            [lineStartIndex, lastNode.range[1]],
            fixed,
          )
        },
        loc: {
          end: {
            column: lineLength,
            line,
          },
          start: {
            column: 0,
            line,
          },
        },
        messageId: 'multipleOnSameLine',
      })
    }
  }
}
