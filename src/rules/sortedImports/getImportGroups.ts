import type {TSESTree} from '@typescript-eslint/types'

export function getImportGroups(
  programBody: TSESTree.ProgramStatement[],
): TSESTree.ImportDeclaration[][] {
  const groups: TSESTree.ImportDeclaration[][] = []
  let currentImportGroup: TSESTree.ImportDeclaration[] = []

  for (const statement of programBody) {
    if (statement.type === 'ImportDeclaration') {
      currentImportGroup.push(statement)
      continue
    }

    if (currentImportGroup.length > 0) {
      groups.push(currentImportGroup)
      currentImportGroup = []
    }
  }

  if (currentImportGroup.length > 0)
    groups.push(currentImportGroup)

  return groups
}
