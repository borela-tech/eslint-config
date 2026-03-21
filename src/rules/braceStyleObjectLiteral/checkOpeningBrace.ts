import {getLineIndent} from '../shared/getLineIndent'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkOpeningBrace(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ObjectExpression,
  openingBrace: TSESTree.Token,
): void {
  const firstProperty = node.properties[0]
  const openingLine = openingBrace.loc.start.line
  const openingBraceOnOwnLine = firstProperty.loc.start.line > openingLine

  if (!openingBraceOnOwnLine) {
    context.report({
      fix(fixer) {
        return fixer.replaceTextRange(
          [openingBrace.range[1], firstProperty.range[0]],
          '\n' + getLineIndent(sourceCode, firstProperty.loc.start.line),
        )
      },
      loc: openingBrace.loc,
      messageId: 'braceOnPropertyLine',
    })
  }
}
