import type {TSESTree} from '@typescript-eslint/utils'

export interface InlineTypeEntry {
  annotationNode: TSESTree.TSTypeAnnotation
  insertLocation: TSESTree.Node
  isExported: boolean
  location: TSESTree.Node
  parameterName?: string
  typeLiteral: TSESTree.TSTypeLiteral
}
