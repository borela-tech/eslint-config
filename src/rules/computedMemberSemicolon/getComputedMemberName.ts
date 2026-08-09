import type {ClassMember} from '../shared/ClassMember'
import type {TSESLint} from '@typescript-eslint/utils'

export function getComputedMemberName(
  member: ClassMember,
  sourceCode: TSESLint.SourceCode,
): string {
  return `[${sourceCode.getText(member.key)}]`
}
