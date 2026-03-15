import {findLinesWithMultipleNodes} from '../shared/findLinesWithMultipleNodes'
import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkMultilineParams(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, Options>,
  params: TSESTree.Parameter[],
  maxLength: number,
): void {
  const linesWithMultipleParams = findLinesWithMultipleNodes(params)

  for (const line of linesWithMultipleParams) {
    const lineLength = getLineLength(sourceCode, line)

    if (lineLength > maxLength) {
      context.report({
        loc: {
          start: {line, column: 0},
          end: {line, column: lineLength},
        },
        messageId: 'multipleOnSameLine',
        data: {maxLength},
      })
    }
  }
}
