import type {TSESTree} from '@typescript-eslint/types'

export function canConvertToShorthand(property: TSESTree.Property): boolean {
  if (property.shorthand)
    return true

  if (property.kind !== 'init')
    return false

  if (property.key.type !== 'Identifier')
    return false

  if (property.value.type !== 'Identifier')
    return false

  return property.key.name === property.value.name
}
