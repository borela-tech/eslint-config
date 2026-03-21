import type {TSESTree} from '@typescript-eslint/types'

export interface ImportValidationError {
  messageId:
    | 'sortedImports'
    | 'sortedNames'
    | 'wrongGroup'
  node: TSESTree.ImportDeclaration
}
