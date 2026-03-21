import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function checkNestedObjects(
  sourceCode: TSESLint.SourceCode,
  context: TSESLint.RuleContext<MessageId, [Options]>,
  node: TSESTree.ObjectExpression,
  checkObjectExpression: (
    sourceCode: TSESLint.SourceCode,
    context: TSESLint.RuleContext<MessageId, [Options]>,
    node: TSESTree.ObjectExpression,
  ) => void,
): void {
  for (const property of node.properties) {
    if (property.type === 'Property' && property.value.type === 'ObjectExpression')
      checkObjectExpression(sourceCode, context, property.value)
    else if (property.type === 'SpreadElement' && property.argument.type === 'ObjectExpression')
      checkObjectExpression(sourceCode, context, property.argument)
  }
}
