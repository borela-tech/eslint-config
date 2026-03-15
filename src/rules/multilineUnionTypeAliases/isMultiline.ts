import type {TSESTree} from '@typescript-eslint/types'

export function isMultiline(unionType: TSESTree.TSUnionType) {
  const {end, start} = unionType.loc ?? {}
  return start?.line !== end?.line
}
