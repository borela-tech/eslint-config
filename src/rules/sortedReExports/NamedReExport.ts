import type {TSESTree} from '@typescript-eslint/types'

export interface NamedReExport {
  declaration: TSESTree.ExportNamedDeclaration
  group:
    | 're-export-named'
    | 'type-named'
  sortKey: string
}
