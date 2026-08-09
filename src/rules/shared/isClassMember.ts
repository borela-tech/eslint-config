import {isFieldLike} from './isFieldLike'
import {isMethodLike} from './isMethodLike'
import type {ClassMember} from './ClassMember'
import type {TSESTree} from '@typescript-eslint/utils'

export function isClassMember(
  member: TSESTree.ClassElement,
): member is ClassMember {
  return isFieldLike(member) || isMethodLike(member)
}
