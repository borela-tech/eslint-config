import {getStatementType} from './getStatementType'
import type {StatementIndices} from './StatementIndices'
import type {StatementType} from './statementType'
import type {TSESTree} from '@typescript-eslint/types'

export function findStatementIndices(
  statements: TSESTree.Statement[],
): StatementIndices {
  let firstRegularStatement = -1
  let lastImport = -1
  let lastReExport = -1

  for (let i = 0; i < statements.length; i++) {
    const type: StatementType = getStatementType(statements[i])

    if (type === 'import')
      lastImport = i
    else if (type === 're-export')
      lastReExport = i
    else if (type === 'other' && firstRegularStatement === -1)
      firstRegularStatement = i
  }

  return {firstRegularStatement, lastImport, lastReExport}
}
