import type {TSESTree} from '@typescript-eslint/types'

export interface ReExportAll {
  declaration: TSESTree.ExportAllDeclaration
  group: 're-export-all'
  sortKey: string
}
