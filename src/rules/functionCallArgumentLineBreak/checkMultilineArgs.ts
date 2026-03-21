import {findLinesWithMultipleNodes} from '../shared/findLinesWithMultipleNodes'
import {formatArgs} from './formatArgs'
import {getLineIndent} from '../shared/getLineIndent'
import {getLineLength} from '../shared/getLineLength'
import {getLineStartIndex} from '../shared/getLineStartIndex'
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
        fix: (fixer): TSESLint.RuleFix => {
          const nodesOnLine = args.filter(
            arg =>
              arg.loc.start.line <= line && arg.loc.end.line >= line,
          )
          const sortedNodes = [...nodesOnLine].sort(
            (a, b) => a.range[0] - b.range[0],
          )
          const lastNode = sortedNodes[sortedNodes.length - 1]
          const lineStartIndex = getLineStartIndex(sourceCode, line)
          const baseIndent = getLineIndent(sourceCode, line)
          const indent = baseIndent + '  '
          const fixed = formatArgs(sourceCode, sortedNodes, indent)
          return fixer.replaceTextRange(
            [lineStartIndex, lastNode.range[1]],
            fixed,
          )
        },
        loc: {
          end: {column: lineLength, line},
          start: {column: 0, line},
        },
        messageId: 'multipleOnSameLine',
      })
    }
  }
}
