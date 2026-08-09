import {SECTION} from './SECTION'
import {SUB_BLOCK} from './SUB_BLOCK'
import type {MemberRankParts} from './MemberRankParts'
import type {MethodLike} from '../shared/MethodLike'

export function getMethodRankParts(
  member: MethodLike,
  visibility: number,
): MemberRankParts {
  if (member.kind === 'constructor') {
    return {
      numbers: [SECTION.constructor],
      tieBreak: 0,
    }
  }

  if (member.kind === 'get' || member.kind === 'set') {
    return {
      numbers: [SECTION.other, visibility, SUB_BLOCK.accessor],
      tieBreak: member.kind === 'get' ? 0 : 1,
    }
  }

  return {
    numbers: [
      SECTION.other,
      visibility,
      SUB_BLOCK.methodOrFunctionLikeField,
    ],
    tieBreak: 0,
  }
}
