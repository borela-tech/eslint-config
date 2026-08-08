import {defaultOptions} from './defaultOptions'
import {getInlineParamText} from './getInlineParamText'
import {getLineLength} from '../shared/getLineLength'
import {getParens} from './getParens'
import {isValidParens} from '../shared/isValidParens'
import type {FunctionNode} from './FunctionNode'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'

export function checkFunction(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: FunctionNode,
): void {
  const options = context.options[0] as Options ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength

  const params = node.params
  if (params.length === 0)
    return

  const parens = getParens(sourceCode, params)

  if (!isValidParens(parens))
    return

  if (parens.openingParen.loc.start.line === parens.closingParen.loc.end.line)
    return

  const paramsText = params
    .map(param => getInlineParamText(sourceCode, param))
    .join(', ')

  const closingLine = parens.closingParen.loc.end.line
  const closingCol = parens.closingParen.loc.end.column
  const closingLineText = getLineLength(sourceCode, closingLine) > closingCol
    ? sourceCode.getText().split('\n')[closingLine - 1].slice(closingCol)
    : ''
  const singleLineLength = parens.openingParen.loc.start.column + 1 + paramsText.length + 1 + closingLineText.length

  if (singleLineLength <= maxLength) {
    context.report({
      fix: fixer => fixer.replaceTextRange(
        [parens.openingParen.range[0], parens.closingParen.range[1]],
        `(${paramsText})`,
      ),
      messageId: 'singleLine',
      node,
    })
  }
}
