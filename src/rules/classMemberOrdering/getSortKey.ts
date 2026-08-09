import {getKeyName} from '../shared/getKeyName'
import {VISIBILITY} from './VISIBILITY'
import type {ClassMember} from '../shared/ClassMember'
import type {TSESLint} from '@typescript-eslint/utils'

export function getSortKey(
  member: ClassMember,
  sourceCode: TSESLint.SourceCode,
  visibility: number,
): string {
  if (member.computed)
    return sourceCode.getText(member.key)

  const name = getKeyName(member.key, sourceCode)

  if (visibility !== VISIBILITY.public && name.startsWith('__'))
    return name.slice(2)

  return name
}
