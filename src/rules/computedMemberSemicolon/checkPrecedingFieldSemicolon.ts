import {getFieldName} from './getFieldName'
import {isFieldLike} from '../shared/isFieldLike'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function checkPrecedingFieldSemicolon(
  context: TSESLint.RuleContext<MessageId, []>,
  sourceCode: TSESLint.SourceCode,
  previous: null | TSESTree.ClassElement,
): void {
  if (!previous || !isFieldLike(previous))
    return

  const lastToken = sourceCode.getLastToken(previous)
  if (!lastToken)
    return

  const tokenBeforeLast = sourceCode.getTokenBefore(lastToken)
  const fieldEndsWithSemicolon = lastToken.value === ';'
    && tokenBeforeLast !== null
    && tokenBeforeLast.loc.end.line === lastToken.loc.start.line

  if (fieldEndsWithSemicolon)
    return

  const insertionToken = lastToken.value === ';' ? tokenBeforeLast : lastToken
  if (!insertionToken)
    return

  context.report({
    data: {
      name: getFieldName(previous, sourceCode),
    },
    fix(fixer) {
      return fixer.insertTextAfter(insertionToken, ';')
    },
    messageId: 'missingFieldSemicolon',
    node: previous,
  })
}
