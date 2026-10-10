import type {TSESTree} from '@typescript-eslint/utils'

export interface TypeParameterDeclarer {
  declarer: TSESTree.Node
  param: TSESTree.TSTypeParameter
}
