import type {TSESTree} from '@typescript-eslint/types'

export function hasElements(elements: (null | TSESTree.Node)[]): boolean {
  const nonNull = elements.filter(
    (el): el is NonNullable<typeof el> => el !== null,
  )
  return nonNull.length >= 1
}
