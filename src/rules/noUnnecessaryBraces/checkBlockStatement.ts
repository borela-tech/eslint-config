import {isSingleLineStatement} from './isSingleLineStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

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
        // Preserve the indentation of the statement
        return [
          fixer.replaceText(node, statementText),
        ]
      },
    })
  }
}
