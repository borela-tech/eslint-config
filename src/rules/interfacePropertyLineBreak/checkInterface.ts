import {checkMultilineMembers} from './checkMultilineMembers'
import {checkSingleLineMembers} from './checkSingleLineMembers'
import {defaultOptions} from './defaultOptions'
import {getBraces} from './getBraces'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkInterface(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.TSInterfaceDeclaration,
): void {
  const options = context.options[0] as Options ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength

  const body = node.body
  if (!body || body.body.length === 0)
    return

  const braces = getBraces(sourceCode, body)

  if (!braces)
    return

  const firstLine = braces.openingBrace.loc.start.line
  const lastLine = braces.closingBrace.loc.end.line

  if (firstLine === lastLine)
    checkSingleLineMembers(sourceCode, context, body.body, braces, maxLength)
  else
    checkMultilineMembers(sourceCode, context, body.body, maxLength)
}
