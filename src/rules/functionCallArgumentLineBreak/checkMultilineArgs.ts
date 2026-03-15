import {findLinesWithMultipleNodes} from '../shared/findLinesWithMultipleNodes'
import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkMultilineArgs(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  args: TSESTree.Node[],
  maxLength: number,
): void {
  const linesWithMultipleArgs = findLinesWithMultipleNodes(args)

  for (const line of linesWithMultipleArgs) {
    const lineLength = getLineLength(sourceCode, line)

    if (lineLength > maxLength) {
      context.report({
        data: {maxLength},
        loc: {
          end: {column: lineLength, line},
          start: {column: 0, line},
        },
        messageId: 'multipleOnSameLine',
      })
    }
  }
}
