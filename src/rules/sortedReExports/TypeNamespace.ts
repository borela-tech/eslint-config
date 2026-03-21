import type {TSESTree} from '@typescript-eslint/types'

export interface TypeNamespace {
  declaration: TSESTree.ExportAllDeclaration
  group: 'type-namespace'
  sortKey: string
}
