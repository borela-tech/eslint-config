import type {TSESTree} from '@typescript-eslint/utils'

interface FixResult {
  interfaceBlock: string
  firstUsageLocation: TSESTree.Node
  replacements: {typeLiteral: TSESTree.TSTypeLiteral, name: string}[]
}

export type {FixResult}
