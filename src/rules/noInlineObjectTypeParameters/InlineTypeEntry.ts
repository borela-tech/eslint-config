import type {TSESTree} from '@typescript-eslint/utils'

export interface InlineTypeEntry {
  typeLiteral: TSESTree.TSTypeLiteral
  annotationNode: TSESTree.TSTypeAnnotation
  location: TSESTree.Node
  insertLocation: TSESTree.Node
  isExported: boolean
}
