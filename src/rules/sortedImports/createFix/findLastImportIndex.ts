import type {Program} from 'estree'

export function findLastImportIndex(programBody: Program['body']): number {
  let lastIndex = 0
  for (let i = 0; i < programBody.length; i++) {
    if (programBody[i].type === 'ImportDeclaration')
      lastIndex = i
    else
      break
  }
  return lastIndex
}
