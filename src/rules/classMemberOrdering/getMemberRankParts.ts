import {getMethodRankParts} from './getMethodRankParts'
import {isFieldLike} from '../shared/isFieldLike'
import {isFunctionLikeField} from './isFunctionLikeField'
import {SECTION} from './SECTION'
import {SUB_BLOCK} from './SUB_BLOCK'
import type {ClassMember} from '../shared/ClassMember'
import type {MemberRankParts} from './MemberRankParts'

export function getMemberRankParts(
  member: ClassMember,
  visibility: number,
): MemberRankParts {
  const isField = isFieldLike(member)

  if (isField) {
    if (member.declare) {
      return {
        numbers: [SECTION.typeDeclaration],
        tieBreak: 0,
      }
    }

    if (isFunctionLikeField(member)) {
      return {
        numbers: [
          SECTION.other,
          visibility,
          SUB_BLOCK.methodOrFunctionLikeField,
        ],
        tieBreak: 0,
      }
    }
  }

  if (member.computed) {
    return {
      numbers: [
        isField ? SECTION.field : SECTION.other,
        visibility,
        SUB_BLOCK.symbolOrComputedField,
      ],
      tieBreak: 0,
    }
  }

  if (!isField)
    return getMethodRankParts(member, visibility)

  return {
    numbers: [SECTION.field, visibility, SUB_BLOCK.regularField],
    tieBreak: 0,
  }
}
