import type {TSESTree} from '@typescript-eslint/utils'

export interface InlineTypeInfo {
  name: string
  parameterName?: string
  typeLiteral: TSESTree.TSTypeLiteral
}
