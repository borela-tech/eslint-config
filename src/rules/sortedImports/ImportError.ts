import type {TSESTree} from '@typescript-eslint/types'

export interface ImportError {
  node: TSESTree.ImportDeclaration
  messageId: 'sortedImports' | 'sortedNames' | 'wrongGroup'
}
