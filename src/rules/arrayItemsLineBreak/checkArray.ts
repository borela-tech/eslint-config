import {buildMultilineFix} from './buildMultilineFix'
import {defaultOptions} from './defaultOptions'
import {getBrackets} from './getBrackets'
import {getLineLength} from '../shared/getLineLength'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkArray(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ArrayExpression,
): void {
  const options = context.options[0] as Options ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength!

  const elements = node.elements

  // Ignore empty arrays and single-element arrays
  if (elements.length <= 1)
    return

  const brackets = getBrackets(sourceCode, node)
  if (!brackets)
    return

  const firstLine = brackets.openingBracket.loc.start.line
  const lastLine = brackets.closingBracket.loc.end.line

  // Only check single-line arrays
  if (firstLine !== lastLine)
    return

  // Check if line length exceeds maxLength
  const lineLength = getLineLength(sourceCode, firstLine)
  if (lineLength <= maxLength)
    return

  // Report and fix
  context.report({
    fix: fixer => buildMultilineFix(
      fixer,
      brackets,
      elements,
      sourceCode,
    ),
    messageId: 'arrayItemsOnNewLine',
    node: elements[0]!,
  })
}
