import type {TSESTree} from '@typescript-eslint/types'

export function isShorthandProperty(property: TSESTree.Property): boolean {
  return property.shorthand
}
