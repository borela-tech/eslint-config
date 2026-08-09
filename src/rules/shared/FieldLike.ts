import type {TSESTree} from '@typescript-eslint/utils'

export type FieldLike =
  | TSESTree.AccessorProperty
  | TSESTree.PropertyDefinition
  | TSESTree.TSAbstractAccessorProperty
  | TSESTree.TSAbstractPropertyDefinition
