import {detectIndentStep} from '../shared/detectIndentStep'
import {getLineIndent} from '../shared/getLineIndent'
import {isSingleLineStatement} from './isSingleLineStatement'
import {reindentText} from '../shared/reindentText'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkNonBlockStatement(
  node: TSESTree.Statement,
  context: TSESLint.RuleContext<MessageIds, []>,
): void {
  // Skip if it's already a block statement
  if (node.type === 'BlockStatement')
    return

  const sourceCode = context.getSourceCode()

  // If the statement spans multiple lines, it needs braces
  if (!isSingleLineStatement(node, sourceCode)) {
    context.report({
      node,
      messageId: 'missingBraces',
      fix(fixer) {
        const statementText = sourceCode.getText(node)
        const parent = node.parent

        // Get the base indentation from the parent control statement's line
        const parentLine = parent?.loc?.start?.line ?? node.loc?.start?.line ?? 1
        const baseIndent = getLineIndent(sourceCode, parentLine)

        // Detect indentation step size
        const indentStepSize = detectIndentStep(sourceCode)
        const indentStep = ' '.repeat(indentStepSize)

        // Re-indent the statement
        const reindentedText = reindentText(
          statementText,
          baseIndent,
          indentStep,
        )

        // Format with opening brace on same line, properly indented body, and closing brace
        const fixed = `{\n${reindentedText}\n${baseIndent}}`

        return [fixer.replaceText(node, fixed)]
      },
    })
  }
}
