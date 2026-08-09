import type {TSESTree} from '@typescript-eslint/utils'

export type MethodLike =
  | TSESTree.MethodDefinition
  | TSESTree.TSAbstractMethodDefinition
