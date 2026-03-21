import type {TSESTree} from '@typescript-eslint/types'

export interface Parens {
  closingParen: TSESTree.Token
  openingParen: TSESTree.Token
}
