import {createFix} from './createFix'
import {isOnSameLineAsCondition} from './isOnSameLineAsCondition'
import {isSingleLineStatement} from './isSingleLineStatement'
import type {RuleContext} from './RuleContext'
import type {SourceCode} from './SourceCode'
import type {StatementBody} from './StatementBody'

export function reportIfOnSameLine(
  context: RuleContext,
  body: StatementBody,
): void {
  const sourceCode = context.sourceCode as SourceCode

  if (body.type !== 'BlockStatement') {
    if (isOnSameLineAsCondition(body, sourceCode)) {
      context.report({
        fix: fixer => createFix(fixer, body, sourceCode),
        messageId: 'singleLine',
        node: body,
      })
    }
  } else {
    const isOnSameLine = isOnSameLineAsCondition(body, sourceCode)
    const isSingleLine = isSingleLineStatement(body, sourceCode)

    if (isOnSameLine && isSingleLine) {
      context.report({
        fix: fixer => createFix(fixer, body, sourceCode),
        messageId: 'singleLine',
        node: body,
      })
    }
  }
}
