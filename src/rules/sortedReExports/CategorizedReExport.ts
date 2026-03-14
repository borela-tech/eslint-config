import type {TSESTree} from '@typescript-eslint/types'

interface NamedReExport {
  declaration: TSESTree.ExportNamedDeclaration
  group:
    | 're-export-named'
    | 'type-named'
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

interface TypeAll {
  declaration: TSESTree.ExportAllDeclaration
  group: 'type-all'
  sortKey: string
}

interface TypeNamespace {
  declaration: TSESTree.ExportAllDeclaration
  group: 'type-namespace'
  sortKey: string
}

export type CategorizedReExport =
  | NamedReExport
  | ReExportAll
  | ReExportNamespace
  | TypeAll
  | TypeNamespace
