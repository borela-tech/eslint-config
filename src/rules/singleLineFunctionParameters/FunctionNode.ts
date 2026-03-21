import type {TSESTree} from '@typescript-eslint/types'

export type FunctionNode =
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.TSCallSignatureDeclaration
  | TSESTree.TSFunctionType
  | TSESTree.TSMethodSignature
