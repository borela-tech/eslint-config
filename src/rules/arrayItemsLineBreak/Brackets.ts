import type {TSESLint} from '@typescript-eslint/utils'

export interface Brackets {
  closingBracket: TSESLint.AST.Token
  openingBracket: TSESLint.AST.Token
}
