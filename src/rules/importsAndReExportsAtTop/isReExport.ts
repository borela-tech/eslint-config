import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

export function isReExport(
  statement: TSESTree.ProgramStatement,
): statement is ReExportDeclaration {
  if (statement.type === 'ExportAllDeclaration')
    return true
  if (statement.type === 'ExportNamedDeclaration')
    return statement.source !== null
  return false
}
