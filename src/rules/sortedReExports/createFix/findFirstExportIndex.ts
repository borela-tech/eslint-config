import type {TSESTree} from '@typescript-eslint/types'

export function findFirstExportIndex(
  programBody: TSESTree.ProgramStatement[],
): number {
  for (let i = 0; i < programBody.length; i++) {
    if (programBody[i].type === 'ExportNamedDeclaration'
      || programBody[i].type === 'ExportAllDeclaration')
      return i
  }
  return -1
}
