import type {TSESTree} from '@typescript-eslint/types'

export type FunctionNode =
  | TSESTree.ArrowFunctionExpression
  | TSESTree.FunctionDeclaration
  | TSESTree.FunctionExpression
  | TSESTree.TSCallSignatureDeclaration
  | TSESTree.TSFunctionType
  | TSESTree.TSMethodSignature
