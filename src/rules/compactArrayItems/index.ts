import {buildCompactFix} from './buildCompactFix'
import {findBracketByRange} from './findBracketByRange'
import {findClosingBracketByRange} from './findClosingBracketByRange'
import {hasElements} from './hasElements'
import {hasMultilineItems} from './hasMultilineItems'
import {isBracketOnOwnLine} from './isBracketOnOwnLine'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'

export const compactArrayItems: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode()

    return {
      ArrayExpression(node): void {
        if (!hasElements(node.elements))
          return

        const tokens = sourceCode.ast.tokens
        const openingBracket = findBracketByRange(tokens, node.range, '[')
        const closingBracket = findClosingBracketByRange(
          tokens,
          node.range,
        )

        if (!openingBracket || !closingBracket)
          return

        if (!isBracketOnOwnLine(sourceCode, openingBracket))
          return

        const nonNullElements = node.elements.filter(
          (el): el is NonNullable<typeof el> => el !== null,
        )

        if (!hasMultilineItems(nonNullElements))
          return

        context.report({
          fix: fixer => buildCompactFix(
            fixer,
            openingBracket,
            closingBracket,
            node.elements,
            sourceCode,
          ),
          messageId: 'compactItems',
          node,
        })
      },
    }
  },

  meta: {
    docs: {
      description:
        'Enforce arrays with multiline items to have a compact, inline bracket style.',
    },
    fixable: 'code',
    messages: messageIds,
    schema: [],
    type: 'layout',
  },
}
