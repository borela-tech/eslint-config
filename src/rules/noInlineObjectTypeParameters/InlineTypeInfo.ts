import type {TSESTree} from '@typescript-eslint/utils'

interface InlineTypeInfo {
  name: string
  typeLiteral: TSESTree.TSTypeLiteral
}

export type {InlineTypeInfo}
