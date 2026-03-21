import {buildCollapsedParams} from './buildCollapsedParams'
import {calculateCollapsedLength} from './calculateCollapsedLength'
import {defaultOptions} from './defaultOptions'
import {getArrowFunctionParens} from './getArrowFunctionParens'
import {isShorthand} from './isShorthand'
import {reportViolation} from './reportViolation'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkArrowFunction(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ArrowFunctionExpression,
): void {
  const options = context.options[0] as Options ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength

  if (isShorthand(sourceCode, node))
    return

  const parens = getArrowFunctionParens(sourceCode, node.params)
  if (!parens)
    return

  const {closingParen, openingParen} = parens
  if (openingParen.loc.start.line === closingParen.loc.end.line)
    return

  const arrowToken = sourceCode.getTokenAfter(closingParen, token => token.value === '=>')
  if (!arrowToken)
    return

  const collapsedParams = buildCollapsedParams(sourceCode, node.params)
  const collapsedLength = calculateCollapsedLength(sourceCode, openingParen, collapsedParams, node.returnType)

  if (collapsedLength <= maxLength) {
    const returnTypeText = node.returnType ? sourceCode.getText(node.returnType) : ''
    reportViolation(context, node, collapsedParams, returnTypeText, arrowToken, openingParen)
  }
}
