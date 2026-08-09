import {isClassMember} from '../shared/isClassMember'
import type {ClassMember} from '../shared/ClassMember'
import type {TSESTree} from '@typescript-eslint/utils'

export function isComputedMember(
  member: TSESTree.ClassElement,
): member is ClassMember {
  return isClassMember(member) && member.computed
}
