import {areAllShorthand} from './areAllShorthand'
import {buildMultilineFix} from './buildMultilineFix'
import {buildShorthandFix} from './buildShorthandFix'
import {getInlineObjectLength} from './getInlineObjectLength'
import {shouldCollapseToShorthand} from './shouldCollapseToShorthand'
import type {Braces} from './Braces'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkSingleLine(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  properties: TSESTree.Property[],
  braces: Braces,
  maxLength: number,
): void {
  if (properties.length === 1)
    return

  const allShorthand = areAllShorthand(properties)
  const inlineLength = getInlineObjectLength(sourceCode, properties)

  if (allShorthand && inlineLength <= maxLength)
    return

  if (!allShorthand) {
    if (shouldCollapseToShorthand(properties, sourceCode, maxLength)) {
      context.report({
        fix: fixer => buildShorthandFix(fixer, braces, properties, sourceCode),
        messageId: 'mixedPropertiesNotAllowed',
        node: properties[0],
      })
      return
    }

    context.report({
      fix: fixer => buildMultilineFix(fixer, braces, properties, sourceCode),
      messageId: 'mixedPropertiesNotAllowed',
      node: properties[0],
    })
    return
  }

  context.report({
    fix: fixer => buildMultilineFix(fixer, braces, properties, sourceCode),
    messageId: 'singleLineExceedsMaxLength',
    node: properties[0],
  })
}
