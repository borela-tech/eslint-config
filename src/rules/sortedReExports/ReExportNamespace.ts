import type {TSESTree} from '@typescript-eslint/types'

export interface ReExportNamespace {
  declaration: TSESTree.ExportAllDeclaration
  group: 're-export-namespace'
  sortKey: string
}
