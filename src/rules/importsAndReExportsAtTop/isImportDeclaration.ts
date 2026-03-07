import type {TSESTree} from '@typescript-eslint/types'

export function isImportDeclaration(
  statement: TSESTree.ProgramStatement,
): statement is TSESTree.ImportDeclaration {
  return statement.type === 'ImportDeclaration'
}
