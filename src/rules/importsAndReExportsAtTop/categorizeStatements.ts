import {getStatementType} from './getStatementType'
import {isImportDeclaration} from './isImportDeclaration'
import {isReExport} from './isReExport'
import type {CategorizedStatements} from './CategorizedStatements'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeStatements(
  statements: TSESTree.ProgramStatement[],
): CategorizedStatements {
  const result: CategorizedStatements = {
    imports: [],
    reExports: [],
    other: [],
  }

  for (const statement of statements) {
    const type = getStatementType(statement)

    if (type === 'import' && isImportDeclaration(statement))
      result.imports.push(statement)
    else if (type === 're-export' && isReExport(statement))
      result.reExports.push(statement)
    else
      result.other.push(statement)
  }

  return result
}
