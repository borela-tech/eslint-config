import {calculateCognitiveComplexity} from './calculateCognitiveComplexity'
import {getFunctionName} from './getFunctionName'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {Options} from './Options'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

const DEFAULT_MAX_COGNITIVE_COMPLEXITY = 15

export const functionCognitiveComplexity: TSESLint.RuleModule<MessageId, [Options]> = {
  create(context) {
    const options = context.options[0] ?? {}
    const maxCognitiveComplexity = options.maxCognitiveComplexity ?? DEFAULT_MAX_COGNITIVE_COMPLEXITY

    function checkFunction(
      node:
        | TSESTree.ArrowFunctionExpression
        | TSESTree.FunctionDeclaration
        | TSESTree.FunctionExpression,
    ): void {
      const complexity = calculateCognitiveComplexity(node)

      if (complexity > maxCognitiveComplexity) {
        const name = getFunctionName(node)

        if (name) {
          context.report({
            data: {
              actual: complexity,
              max: maxCognitiveComplexity,
              name,
            },
            messageId: 'tooHighCognitiveComplexity',
            node,
          })
        } else {
          context.report({
            data: {
              actual: complexity,
              max: maxCognitiveComplexity,
            },
            messageId: 'tooHighCognitiveComplexityAnonymous',
            node,
          })
        }
      }
    }

    return {
      ArrowFunctionExpression(node) {
        checkFunction(node)
      },

      FunctionDeclaration(node) {
        checkFunction(node)
      },

      FunctionExpression(node) {
        checkFunction(node)
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce cognitive complexity threshold for functions',
    },
    messages: messageIds,
    schema: [{
      additionalProperties: false,
      properties: {
        maxCognitiveComplexity: {
          type: 'number',
        },
      },
      type: 'object',
    }],
    type: 'suggestion',
  },
}
