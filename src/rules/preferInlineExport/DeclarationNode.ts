import type {TSESTree} from '@typescript-eslint/types'

export type DeclarationNode =
  | TSESTree.ClassDeclaration
  | TSESTree.FunctionDeclaration
  | TSESTree.TSInterfaceDeclaration
  | TSESTree.TSTypeAliasDeclaration
  | TSESTree.VariableDeclaration
