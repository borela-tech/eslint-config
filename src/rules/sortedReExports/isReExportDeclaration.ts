import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

export function isReExportDeclaration(
  statement: TSESTree.ProgramStatement,
): statement is ReExportDeclaration {
  return (statement.type === 'ExportNamedDeclaration' && statement.source !== null)
    || statement.type === 'ExportAllDeclaration'
}
