import {getMemberRankParts} from './getMemberRankParts'
import {getSortKey} from './getSortKey'
import {getVisibility} from './getVisibility'
import type {ClassMember} from '../shared/ClassMember'
import type {MemberSortRank} from './MemberSortRank'
import type {TSESLint} from '@typescript-eslint/utils'

export function getMemberSortRank(
  member: ClassMember,
  sourceCode: TSESLint.SourceCode,
): MemberSortRank {
  const visibility = getVisibility(member)
  const {numbers, tieBreak} = getMemberRankParts(member, visibility)
  return {
    numbers,
    sortKey: getSortKey(member, sourceCode, visibility),
    tieBreak,
  }
}
