import type {MethodLike} from './MethodLike'
import type {TSESTree} from '@typescript-eslint/utils'

export function isMethodLike(
  member: TSESTree.ClassElement,
): member is MethodLike {
  return member.type === 'MethodDefinition'
    || member.type === 'TSAbstractMethodDefinition'
}
