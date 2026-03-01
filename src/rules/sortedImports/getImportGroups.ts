import type {TSESTree} from '@typescript-eslint/types'

export function getImportGroups(programBody: TSESTree.ProgramStatement[]): TSESTree.ImportDeclaration[][] {
  const groups: TSESTree.ImportDeclaration[][] = []
  let currentGroup: TSESTree.ImportDeclaration[] = []

  for (const statement of programBody) {
    if (statement.type === 'ImportDeclaration') {
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
