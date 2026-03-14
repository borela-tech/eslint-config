import type {TSESTree} from '@typescript-eslint/types'

export interface Parens {
  openingParen: {value: string, loc: TSESTree.SourceLocation, range: [number, number]}
  closingParen: {value: string, loc: TSESTree.SourceLocation, range: [number, number]}
}
