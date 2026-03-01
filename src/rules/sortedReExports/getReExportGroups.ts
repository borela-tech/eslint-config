import type {ReExportDeclaration} from './ReExportDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

function isReExportDeclaration(
  statement: TSESTree.ProgramStatement,
): statement is ReExportDeclaration {
  return (statement.type === 'ExportNamedDeclaration' && statement.source !== null)
    || statement.type === 'ExportAllDeclaration'
}

export function getReExportGroups(
  programBody: TSESTree.ProgramStatement[],
): ReExportDeclaration[][] {
  const groups: ReExportDeclaration[][] = []
  let currentGroup: ReExportDeclaration[] = []

  for (const statement of programBody) {
    if (isReExportDeclaration(statement)) {
      currentGroup.push(statement)
      continue
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup)
      currentGroup = []
    }
  }

  if (currentGroup.length > 0)
    groups.push(currentGroup)

  return groups
}
