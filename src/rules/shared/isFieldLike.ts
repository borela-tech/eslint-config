import type {FieldLike} from './FieldLike'
import type {TSESTree} from '@typescript-eslint/utils'

export function isFieldLike(
  member: TSESTree.ClassElement,
): member is FieldLike {
  return member.type === 'AccessorProperty'
    || member.type === 'PropertyDefinition'
    || member.type === 'TSAbstractAccessorProperty'
    || member.type === 'TSAbstractPropertyDefinition'
}
