import type {TSESTree} from '@typescript-eslint/types'

export type ReExport =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportNamedDeclaration
