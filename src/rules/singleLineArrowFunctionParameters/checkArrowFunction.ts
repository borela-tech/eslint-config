import {defaultOptions} from './defaultOptions'
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

  const params = node.params
  if (params.length === 0)
    return

  const openingParen = sourceCode.getTokenBefore(params[0], token => token.value === '(')
  if (!openingParen)
    return

  const lastParam = params[params.length - 1]
  const closingParen = sourceCode.getTokenAfter(lastParam, token => token.value === ')')
  if (!closingParen)
    return

  if (openingParen.loc.start.line === closingParen.loc.end.line)
    return

  const arrowToken = sourceCode.getTokenAfter(closingParen, token => token.value === '=>')
  if (!arrowToken)
    return

  const paramsText = params
    .map((param, index) => {
      const text = sourceCode.getText(param)
      const isLastParam = index === params.length - 1
      if (isLastParam)
        return text
      return text + ','
    })
    .join(' ')

  const singleLineParams = `(${paramsText})`

  let returnTypeText = ''
  if (node.returnType) {
    returnTypeText = sourceCode.getText(node.returnType)
  }

  const allLines = sourceCode.getText().split('\n')
  const closingLine = allLines[closingParen.loc.end.line - 1]
  const textAfterClosingParen = closingLine.slice(closingParen.loc.end.column)

  const collapsedLineLength = openingParen.loc.start.column + singleLineParams.length + returnTypeText.length + textAfterClosingParen.length

  if (collapsedLineLength <= maxLength) {
    context.report({
      fix: fixer => fixer.replaceTextRange(
        [openingParen.range[0], arrowToken.range[1]],
        singleLineParams + returnTypeText + ' =>',
      ),
      messageId: 'singleLine',
      node,
    })
  }
}
