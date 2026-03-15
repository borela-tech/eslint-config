import {checkMultilineArgs} from './checkMultilineArgs'
import {checkSingleLineArgs} from './checkSingleLineArgs'
import {defaultOptions} from './defaultOptions'
import {getParens} from '../shared/getParens'
import {isValidParens} from '../shared/isValidParens'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkCall(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, Options>,
  node: TSESTree.CallExpression,
): void {
  const options = context.options[0] ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength

  const args = node.arguments as TSESTree.Node[]
  const parens = getParens(sourceCode, args)

  if (!isValidParens(parens))
    return

  const firstLine = parens.openingParen.loc.start.line
  const lastLine = parens.closingParen.loc.end.line

  if (firstLine === lastLine)
    checkSingleLineArgs(sourceCode, context, args, parens, maxLength)
  else
    checkMultilineArgs(sourceCode, context, args, maxLength)
}
