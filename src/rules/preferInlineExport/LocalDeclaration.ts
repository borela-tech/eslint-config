import type {TSESTree} from '@typescript-eslint/types'

export interface LocalDeclaration {
  name: string
  node: TSESTree.Node
}
