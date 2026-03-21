import type {TSESTree} from '@typescript-eslint/types'

export interface TypeAll {
  declaration: TSESTree.ExportAllDeclaration
  group: 'type-all'
  sortKey: string
}
