import type {TSESTree} from '@typescript-eslint/types'

export function isMultiline(unionType: TSESTree.TSUnionType): boolean {
  const {end, start} = unionType.loc ?? {}
  return start?.line !== end?.line
}
