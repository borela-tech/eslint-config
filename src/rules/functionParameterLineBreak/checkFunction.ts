import {checkMultilineParams} from './checkMultilineParams'
import {checkSingleLineParams} from './checkSingleLineParams'
import {defaultOptions} from './Options'
import {getParens} from '../shared/getParens'
import {isValidParens} from '../shared/isValidParens'
import type {MessageId} from './MessageIds'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkFunction(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, Options>,
  node: TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration,
): void {
  const options = context.options[0] ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength

  const params = node.params
  const parens = getParens(sourceCode, params)

  if (!isValidParens(parens))
    return

  const firstLine = parens.openingParen.loc.start.line
  const lastLine = parens.closingParen.loc.end.line

  if (firstLine === lastLine)
    checkSingleLineParams(sourceCode, context, params, parens, maxLength)
  else
    checkMultilineParams(sourceCode, context, params, maxLength)
}
