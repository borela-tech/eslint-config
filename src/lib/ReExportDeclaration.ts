import type {TSESTree} from '@typescript-eslint/types'

export type ReExportDeclaration =
  | TSESTree.ExportAllDeclaration
  | TSESTree.ExportNamedDeclaration
