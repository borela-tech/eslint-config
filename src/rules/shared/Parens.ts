import type {TSESTree} from '@typescript-eslint/types'

export interface Parens {
  closingParen: {
    loc: TSESTree.SourceLocation
    range: [number, number]
    value: string
  }
  openingParen: {
    loc: TSESTree.SourceLocation
    range: [number, number]
    value: string
  }
}
