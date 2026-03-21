import type {ArrowFunctionParens} from './ArrowFunctionParens'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function reportViolation(
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ArrowFunctionExpression,
  collapsedParams: string,
  returnTypeText: string,
  arrowToken: TSESTree.Token,
  openingParen: ArrowFunctionParens['openingParen'],
): void {
  context.report({
    fix: fixer => fixer.replaceTextRange(
      [openingParen.range[0], arrowToken.range[1]],
      collapsedParams + returnTypeText + ' =>',
    ),
    messageId: 'singleLine',
    node,
  })
}
