import {getLineIndent} from '../shared/getLineIndent'
import {getReplacementText} from './getReplacementText'
import {isSingleLineStatement} from '../shared/isSingleLineStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkBlockStatement(
  node: TSESTree.BlockStatement,
  context: TSESLint.RuleContext<MessageIds, []>,
): void {
  if (node.body.length !== 1)
    return

  const statement = node.body[0]
  const sourceCode = context.getSourceCode()

  if (isSingleLineStatement(statement, sourceCode)) {
    context.report({
      fix(fixer) {
        const statementText = sourceCode.getText(statement)
        const tokenBefore = sourceCode.getTokenBefore(node)
        const tokenBeforeLine = tokenBefore?.loc?.start?.line ?? node.loc?.start?.line ?? 1
        const baseIndent = getLineIndent(sourceCode, tokenBeforeLine)

        const rangeStart = tokenBefore ? tokenBefore.range[1] : node.range[0]
        const range: Readonly<[number, number]> = [rangeStart, node.range[1]]

        const tokenAfter = sourceCode.getTokenAfter(node)
        const hasElseAfter = tokenAfter && tokenAfter.value === 'else'

        const replacementText = getReplacementText(
          statementText,
          baseIndent,
          hasElseAfter,
        )

        return fixer.replaceTextRange(range, replacementText)
      },
      messageId: 'unnecessaryBraces',
      node,
    })
  }
}
