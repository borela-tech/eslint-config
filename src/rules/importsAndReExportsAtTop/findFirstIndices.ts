import {getStatementType} from './getStatementType'
import type {StatementIndices} from './StatementIndices'
import type {StatementType} from './statementType'
import type {TSESTree} from '@typescript-eslint/types'

export function findFirstIndices(
  statements: TSESTree.Statement[],
): StatementIndices {
  let firstImport = Infinity
  let firstReExport = Infinity
  let firstOther = -1

  for (let i = 0; i < statements.length; i++) {
    const type: StatementType = getStatementType(statements[i])

    if (type === 'import' && firstImport === Infinity)
      firstImport = i
    else if (type === 're-export' && firstReExport === Infinity)
      firstReExport = i
    else if (type === 'other' && firstOther === -1)
      firstOther = i
  }

  return {firstImport, firstReExport, firstOther}
}
