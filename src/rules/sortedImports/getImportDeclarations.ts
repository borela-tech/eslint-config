import type {ImportDeclaration} from 'estree'
import type {Program} from 'estree'

export function getImportDeclarations(programBody: Program['body']): ImportDeclaration[] {
  return programBody.filter(
    (statement): statement is ImportDeclaration =>
      statement.type === 'ImportDeclaration',
  )
}
