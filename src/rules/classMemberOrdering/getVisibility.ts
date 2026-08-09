import {VISIBILITY} from './VISIBILITY'
import type {ClassMember} from '../shared/ClassMember'

export function getVisibility(member: ClassMember): number {
  if (member.key.type === 'PrivateIdentifier')
    return VISIBILITY.private

  if (member.accessibility === 'private')
    return VISIBILITY.private

  if (member.accessibility === 'protected')
    return VISIBILITY.protected

  return VISIBILITY.public
}
