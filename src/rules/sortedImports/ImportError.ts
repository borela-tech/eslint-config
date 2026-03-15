import type {TSESTree} from '@typescript-eslint/types'

export interface ImportError {
  messageId:
    | 'sortedImports'
    | 'sortedNames'
    | 'wrongGroup'
  node: TSESTree.ImportDeclaration
}
