import type {TSESTree} from '@typescript-eslint/types'

interface NamedReExport {
  declaration: TSESTree.ExportNamedDeclaration
  group:
    | 're-export-named'
    | 're-export-type'
  sortKey: string
}

interface ReExportAll {
  declaration: TSESTree.ExportAllDeclaration
  group: 're-export-all'
  sortKey: string
}

interface ReExportNamespace {
  declaration: TSESTree.ExportAllDeclaration
  group: 're-export-namespace'
  sortKey: string
}

export type CategorizedReExport =
  | NamedReExport
  | ReExportAll
  | ReExportNamespace
