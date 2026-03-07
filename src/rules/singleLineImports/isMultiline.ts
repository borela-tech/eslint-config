import type {TSESTree} from '@typescript-eslint/types'

export function isMultiline(declaration: TSESTree.ImportDeclaration) {
  const {start, end} = declaration.loc ?? {}
  return start?.line !== end?.line
}
