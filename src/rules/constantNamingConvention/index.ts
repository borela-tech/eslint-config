import {isPrimitiveValue} from './isPrimitiveValue'
import {messageIds} from './messageIds'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'

const CAMEL_CASE_REGEX = /^[a-z][a-zA-Z0-9]*$/
const UPPER_CASE_REGEX = /^[A-Z][A-Z0-9_]*$/

export const constantNamingConvention: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    return {
      VariableDeclaration(node): void {
        for (const declaration of node.declarations) {
          if (declaration.id.type !== 'Identifier')
            continue

          const {id, init} = declaration
          const name = id.name

          if (node.kind === 'const') {
            const isPrimitive = isPrimitiveValue(init)

            if (isPrimitive) {
              if (!UPPER_CASE_REGEX.test(name)) {
                context.report({
                  data: {name},
                  messageId: 'upperCase',
                  node: id,
                })
              }
            }
            else {
              if (!CAMEL_CASE_REGEX.test(name)) {
                context.report({
                  data: {name},
                  messageId: 'camelCase',
                  node: id,
                })
              }
            }
          }
          else {
            if (!CAMEL_CASE_REGEX.test(name)) {
              context.report({
                data: {name},
                messageId: 'camelCase',
                node: id,
              })
            }
          }
        }
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce naming conventions based on variable type and value',
    },
    fixable: undefined,
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
