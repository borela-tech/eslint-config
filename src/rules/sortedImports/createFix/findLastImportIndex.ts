import type {TSESTree} from '@typescript-eslint/types'

export function findLastImportIndex(programBody: TSESTree.ProgramStatement[]): number {
  let lastIndex = 0
  for (let i = 0; i < programBody.length; i++) {
    if (programBody[i].type === 'ImportDeclaration')
      lastIndex = i
    else
      break
  }
  return lastIndex
}
