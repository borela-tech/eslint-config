import {getLineIndent} from '../shared/getLineIndent'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkPropertyOnOwnLine(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  prevPropertyEndLine: number,
  property: TSESTree.ObjectLiteralElement,
): void {
  const propStartLine = property.loc.start.line
  if (propStartLine === prevPropertyEndLine) {
    context.report({
      fix(fixer) {
        const lastNewLineIndex = sourceCode
          .getText()
          .lastIndexOf('\n', property.range[0] - 1)

        return fixer.replaceTextRange(
          [lastNewLineIndex, property.range[0]],
          '\n' + getLineIndent(sourceCode, property.loc.start.line),
        )
      },
      loc: property.loc,
      messageId: 'propertiesOnSameLine',
    })
  }
}
