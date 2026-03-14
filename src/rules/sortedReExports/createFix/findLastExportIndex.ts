import type {TSESTree} from '@typescript-eslint/types'

export function findLastExportIndex(
  programBody: TSESTree.ProgramStatement[],
): number {
  let lastIndex = -1
  for (let i = 0; i < programBody.length; i++) {
    if (programBody[i].type === 'ExportNamedDeclaration'
      || programBody[i].type === 'ExportAllDeclaration')
      lastIndex = i
  }
  return lastIndex
}
