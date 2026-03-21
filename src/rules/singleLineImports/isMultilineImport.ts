import type {TSESTree} from '@typescript-eslint/types'

export function isMultilineImport(
  declaration: TSESTree.ImportDeclaration,
): boolean {
  const {end, start} = declaration.loc ?? {}
  return start?.line !== end?.line
}
