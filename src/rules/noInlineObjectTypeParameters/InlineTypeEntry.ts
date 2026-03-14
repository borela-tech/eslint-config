import type {TSESTree} from '@typescript-eslint/utils'

interface InlineTypeEntry {
  typeLiteral: TSESTree.TSTypeLiteral
  annotationNode: TSESTree.TSTypeAnnotation
  location: TSESTree.Node
  insertLocation: TSESTree.Node
  isExported: boolean
}

export type {InlineTypeEntry}
