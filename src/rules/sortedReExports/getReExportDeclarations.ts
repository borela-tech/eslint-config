import type {ReExportDeclaration} from './ReExportDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

export function getReExportDeclarations(
  programBody: TSESTree.ProgramStatement[],
): ReExportDeclaration[] {
  return programBody.filter(
    (statement): statement is ReExportDeclaration =>
      (statement.type === 'ExportNamedDeclaration' && statement.source !== null)
      || statement.type === 'ExportAllDeclaration',
  )
}
