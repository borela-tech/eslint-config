import type {TSESTree} from '@typescript-eslint/types'

export interface ArrowFunctionParens {
  closingParen: TSESTree.Token
  openingParen: TSESTree.Token
}
