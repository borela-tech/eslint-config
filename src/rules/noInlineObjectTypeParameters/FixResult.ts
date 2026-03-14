import type {TSESTree} from '@typescript-eslint/utils'

export interface FixResult {
  interfaceBlock: string
  firstUsageLocation: TSESTree.Node
  replacements: {typeLiteral: TSESTree.TSTypeLiteral, name: string}[]
}
