import {getStatementType} from './getStatementType'
import {ReExport} from './ReExport'
import type {CategorizedStatements} from './CategorizedStatements'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeStatements(
  statements: TSESTree.Statement[],
): CategorizedStatements {
  const result: CategorizedStatements = {
    imports: [],
    reExports: [],
    other: [],
  }

  for (const statement of statements) {
    const type = getStatementType(statement)

    if (type === 'import')
      result.imports.push(statement as TSESTree.ImportDeclaration)
    else if (type === 're-export')
      result.reExports.push(statement as ReExport)
    else
      result.other.push(statement)
  }

  return result
}
