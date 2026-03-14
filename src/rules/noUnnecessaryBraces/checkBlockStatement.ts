import {isSingleLineStatement} from './isSingleLineStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

/**
 * Gets the indentation string for a specific line in the source code.
 */
function getLineIndent(sourceCode: TSESLint.SourceCode, line: number): string {
  const text = sourceCode.getText()
  const lines = text.split('\n')
  const lineText = lines[line - 1] ?? ''
  const match = lineText.match(/^(\s*)/)
  return match?.[1] ?? ''
}

export function checkBlockStatement(
  node: TSESTree.BlockStatement,
  context: TSESLint.RuleContext<MessageIds, []>,
): void {
  // Only check blocks with exactly one statement
  if (node.body.length !== 1)
    return

  const statement = node.body[0]
  const sourceCode = context.getSourceCode()

  // If the inner statement is single-line, braces are unnecessary.
  if (isSingleLineStatement(statement, sourceCode)) {
    context.report({
      node,
      messageId: 'unnecessaryBraces',
      fix(fixer) {
        const statementText = sourceCode.getText(statement)

        // Get the token before the block to determine the base indentation
        const tokenBefore = sourceCode.getTokenBefore(node)
        const tokenBeforeLine = tokenBefore?.loc?.start?.line ?? node.loc?.start?.line ?? 1
        const baseIndent = getLineIndent(sourceCode, tokenBeforeLine)
        const statementIndent = `${baseIndent}  `

        // Get the range including whitespace before the block to remove trailing space
        const rangeStart = tokenBefore ? tokenBefore.range[1] : node.range[0]
        const range: Readonly<[number, number]> = [rangeStart, node.range[1]]

        // Check what comes after this block
        const tokenAfter = sourceCode.getTokenAfter(node)
        const hasElseAfter = tokenAfter && tokenAfter.value === 'else'

        if (hasElseAfter)
          return fixer.replaceTextRange(range, `\n${statementIndent}${statementText}\n${baseIndent}`)

        // Always add a newline and indentation to comply with brace-style-control-statements rule
        return fixer.replaceTextRange(range, `\n${statementIndent}${statementText}`)
      },
    })
  }
}
