import {getLineIndent} from '../shared/getLineIndent'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkClosingBrace(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ObjectExpression,
  closingBrace: TSESTree.Token,
): void {
  const lastProperty = node.properties[node.properties.length - 1]
  const closingLine = closingBrace.loc.end.line
  const closingBraceOnOwnLine = lastProperty.loc.end.line < closingLine

  if (!closingBraceOnOwnLine) {
    context.report({
      fix(fixer) {
        return fixer.replaceTextRange(
          [lastProperty.range[1], closingBrace.range[0]],
          ',\n' + getLineIndent(sourceCode, lastProperty.loc.end.line),
        )
      },
      loc: closingBrace.loc,
      messageId: 'braceOnPropertyLine',
    })
  }
}
