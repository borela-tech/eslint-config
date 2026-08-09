import {compare} from '@lib/compare'
import type {MemberSortRank} from './MemberSortRank'

export function compareMemberSortRanks(
  a: MemberSortRank,
  b: MemberSortRank,
): number {
  const length = Math.min(a.numbers.length, b.numbers.length)

  for (let i = 0; i < length; i++) {
    if (a.numbers[i] !== b.numbers[i])
      return a.numbers[i] - b.numbers[i]
  }

  if (a.numbers.length !== b.numbers.length)
    return a.numbers.length - b.numbers.length

  const keyComparison = compare(a.sortKey, b.sortKey)
  if (keyComparison !== 0)
    return keyComparison

  return a.tieBreak - b.tieBreak
}
