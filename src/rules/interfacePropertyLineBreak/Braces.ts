import type {TSESTree} from '@typescript-eslint/types'

export interface Braces {
  closingBrace: {
    loc: TSESTree.SourceLocation
    range: [number, number]
    value: string
  }
  openingBrace: {
    loc: TSESTree.SourceLocation
    range: [number, number]
    value: string
  }
}
