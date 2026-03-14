import {isSingleLineStatement} from './isSingleLineStatement'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

/**
 * Detects the indentation step (number of spaces) used in the file.
 * Analyzes the source code to find the most common indentation pattern.
 */
function detectIndentStep(sourceCode: TSESLint.SourceCode): number {
  const text = sourceCode.getText()
  const lines = text.split('\n')

  // Count leading spaces at each indentation level
  const indentCounts = new Map<number, number>()

  for (const line of lines) {
    const match = line.match(/^( *)/)
    if (match) {
      const spaces = match[1].length
      if (spaces > 0)
        indentCounts.set(spaces, (indentCounts.get(spaces) ?? 0) + 1)
    }
  }

  // Find the minimum indentation that appears frequently
  const sortedIndents = Array.from(indentCounts.entries())
    .filter(([spaces]) => spaces > 0)
    .sort((a, b) => a[0] - b[0])

  if (sortedIndents.length === 0)
    return 2

  // The step is likely the GCD of all indentation values or the smallest one
  const minIndent = sortedIndents[0][0]

  // Check if all indents are multiples of a common value (2 or 4)
  for (const step of [2, 4]) {
    const isMultipleOfStep = sortedIndents.every(([spaces]) => spaces % step === 0)
    if (isMultipleOfStep)
      return step
  }

  return minIndent
}

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

/**
 * Re-indents text to match a target indentation level.
 * Calculates relative indentation based on the minimum indentation found in lines
 * that actually start the line (skipping the first line which may start mid-line).
 */
function reindentText(
  text: string,
  newBaseIndent: string,
  indentStep: string,
): string {
  const lines = text.split('\n')

  // Find the minimum indentation across lines 1+ (skip line 0 which may start mid-line)
  let minIndent = Infinity
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.trim() === '')
      continue
    const match = line.match(/^( *)/)
    if (match)
      minIndent = Math.min(minIndent, match[1].length)
  }

  if (minIndent === Infinity) {
    // All lines are empty or only one line
    return lines
      .map(line => {
        if (line.trim() === '')
          return ''
        return newBaseIndent + indentStep + line.trimStart()
      })
      .join('\n')
  }

  return lines
    .map((line, index) => {
      if (line.trim() === '')
        return ''

      if (index === 0)
        return newBaseIndent + indentStep + line.trimStart()

      // For subsequent lines, calculate relative indentation from the minimum
      const relativeIndent = line.slice(minIndent)
      return newBaseIndent + indentStep + relativeIndent
    })
    .join('\n')
}

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
