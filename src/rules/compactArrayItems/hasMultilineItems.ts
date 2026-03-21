import type {TSESTree} from '@typescript-eslint/types'

export function hasMultilineItems(nonNullElements: TSESTree.Node[]): boolean {
  return nonNullElements.some(
    el => el.loc.start.line !== el.loc.end.line,
  )
}
