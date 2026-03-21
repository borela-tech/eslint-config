import type {StatementType} from './StatementType'
import type {TSESTree} from '@typescript-eslint/types'

export function getStatementType(statement: TSESTree.Statement): StatementType {
  if (statement.type === 'ImportDeclaration')
    return 'import'

  if (statement.type === 'ExportAllDeclaration')
    return 're-export'

  if (statement.type === 'ExportNamedDeclaration') {
    if (statement.source !== null)
      return 're-export'
  }

  return 'other'
}
