import {checkClosingBrace} from './checkClosingBrace'
import {checkNestedObjects} from './checkNestedObjects'
import {checkOpeningBrace} from './checkOpeningBrace'
import {checkPropertyOnOwnLine} from './checkPropertyOnOwnLine'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkObjectExpression(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ObjectExpression,
): void {
  if (node.properties.length === 0)
    return

  const openingBrace = sourceCode.getFirstToken(node)
  const closingBrace = sourceCode.getLastToken(node)

  if (!openingBrace || !closingBrace)
    return

  const openingLine = openingBrace.loc.start.line
  const closingLine = closingBrace.loc.end.line

  if (openingLine === closingLine)
    return

  checkOpeningBrace(sourceCode, context, node, openingBrace)

  let prevPropertyEndLine = node.properties[0].loc.start.line
  for (const property of node.properties) {
    if (property !== node.properties[0])
      checkPropertyOnOwnLine(sourceCode, context, prevPropertyEndLine, property)

    prevPropertyEndLine = property.loc.end.line
  }

  checkClosingBrace(sourceCode, context, node, closingBrace)
  checkNestedObjects(sourceCode, context, node, checkObjectExpression)
}
