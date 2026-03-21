import {areAllShorthand} from './areAllShorthand'
import {getInlineObjectLength} from './getInlineObjectLength'
import type {Braces} from './Braces'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkMultiline(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ObjectExpression,
  braces: Braces,
  maxLength: number,
): void {
  const properties = node.properties as TSESTree.Property[]
  const allShorthand = areAllShorthand(properties)

  if (!allShorthand)
    return

  const inlineLength = getInlineObjectLength(sourceCode, properties)

  if (inlineLength > maxLength)
    return

  context.report({
    fix(fixer) {
      const names: string[] = []
      for (const prop of properties) {
        if (prop.key.type === 'Identifier')
          names.push(prop.key.name)
        else
          names.push(sourceCode.getText(prop))
      }

      return fixer.replaceText(node, `{${names.join(', ')}}`)
    },
    messageId: 'multilineCanBeSingleLine',
    node: properties[0],
  })
}
