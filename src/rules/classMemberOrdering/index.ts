import {compareMemberSortRanks} from './compareMemberSortRanks'
import {getMemberName} from './getMemberName'
import {getMemberSortRank} from './getMemberSortRank'
import {isClassMember} from '../shared/isClassMember'
import {messageIds} from './messageIds'
import type {MemberSortRank} from './MemberSortRank'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

interface BestMember {
  name: string
  rank: MemberSortRank
}

export const classMemberOrdering: TSESLint.RuleModule<MessageId, []> = {
  create(context) {
    const sourceCode = context.sourceCode

    return {
      ClassBody(node: TSESTree.ClassBody): void {
        let best: BestMember | null = null

        for (const member of node.body) {
          if (!isClassMember(member))
            continue

          const rank = getMemberSortRank(member, sourceCode)
          const name = getMemberName(member, sourceCode)

          if (best && compareMemberSortRanks(best.rank, rank) > 0) {
            context.report({
              data: {
                name,
                previousName: best.name,
              },
              messageId: 'memberOutOfOrder',
              node: member,
            })
            continue
          }

          best = {name, rank}
        }
      },
    }
  },

  meta: {
    docs: {
      description: 'Enforce canonical class member ordering.',
    },
    messages: messageIds,
    schema: [],
    type: 'suggestion',
  },
}
