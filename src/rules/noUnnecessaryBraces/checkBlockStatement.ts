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
        const parent = node.parent
        
        // Check if this block is part of an if/else if/else chain
        const isInIfChain = parent && (
          parent.type === 'IfStatement' ||
          (parent.type === 'BlockStatement' && parent.parent?.type === 'IfStatement')
        )
        
        if (isInIfChain) {
          // For if/else chains, we need to preserve newlines to avoid collapsing statements
          // Get the line of the if statement to match indentation
          const ifLine = parent?.loc?.start?.line ?? node.loc?.start?.line ?? 1
          const baseIndent = getLineIndent(sourceCode, ifLine)
          
          // Check what comes after this block
          const tokenAfter = sourceCode.getTokenAfter(node)
          const hasElseAfter = tokenAfter && tokenAfter.value === 'else'
          
          if (hasElseAfter) {
            // If there's an else/else if after, we need a newline before it
            return [fixer.replaceText(node, `\n${baseIndent}  ${statementText}\n${baseIndent}`)]
          }
        }
        
        // Get the token before the block to check for spacing
        const tokenBefore = sourceCode.getTokenBefore(node)
        let prefix = ''
        
        if (tokenBefore) {
          // Check if there's already whitespace between the token and the block
          const textBetween = sourceCode.getText().slice(tokenBefore.range[1], node.range[0])
          // If the text between doesn't end with a space, add one
          if (!textBetween.endsWith(' ')) {
            prefix = ' '
          }
        }
        
        return [fixer.replaceText(node, `${prefix}${statementText}`)]
      },
    })
  }
}
