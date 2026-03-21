import {checkMultiline} from './checkMultiline'
import {checkSingleLine} from './checkSingleLine'
import {defaultOptions} from './defaultOptions'
import {getBraces} from './getBraces'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkObject(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ObjectExpression,
): void {
  const options = context.options[0] as Options ?? {}
  const maxLength = options.maxLength ?? defaultOptions.maxLength!

  const properties = node.properties as TSESTree.Property[]

  if (properties.length === 0)
    return

  const braces = getBraces(sourceCode, node)
  if (!braces)
    return

  const firstLine = braces.openingBrace.loc.start.line
  const lastLine = braces.closingBrace.loc.end.line

  if (firstLine === lastLine)
    checkSingleLine(sourceCode, context, properties, braces, maxLength)
  else
    checkMultiline(sourceCode, context, node, braces, maxLength)
}
