import type {TSESTree} from '@typescript-eslint/utils'

export interface FixResult {
  firstUsageLocation: TSESTree.Node
  interfaceBlock: string
  replacements: {name: string, typeLiteral: TSESTree.TSTypeLiteral}[]
}
