import {isReExportDeclaration} from './isReExportDeclaration'
import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

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
