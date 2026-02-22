import type {TSESTree} from '@typescript-eslint/types'

export function getImportDeclarations(programBody: TSESTree.ProgramStatement[]): TSESTree.ImportDeclaration[] {
  return programBody.filter(
    (statement): statement is TSESTree.ImportDeclaration =>
      statement.type === 'ImportDeclaration',
  )
}
