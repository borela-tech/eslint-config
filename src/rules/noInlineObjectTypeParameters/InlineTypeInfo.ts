import type {TSESTree} from '@typescript-eslint/utils'

export interface InlineTypeInfo {
  name: string
  typeLiteral: TSESTree.TSTypeLiteral
}
