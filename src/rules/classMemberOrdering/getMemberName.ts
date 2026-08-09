import {getKeyName} from '../shared/getKeyName'
import type {ClassMember} from '../shared/ClassMember'
import type {TSESLint} from '@typescript-eslint/utils'

export function getMemberName(
  member: ClassMember,
  sourceCode: TSESLint.SourceCode,
): string {
  if (member.computed)
    return `[${sourceCode.getText(member.key)}]`

  return getKeyName(member.key, sourceCode)
}
