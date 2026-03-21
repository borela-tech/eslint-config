import type {TSESTree} from '@typescript-eslint/utils'

export interface TopLevelDeclaration {
  insertLocation: TSESTree.Node
  isExported: boolean
  node: TSESTree.Node
}
