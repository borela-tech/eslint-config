import type {FieldLike} from '../shared/FieldLike'

export function isFunctionLikeField(member: FieldLike): boolean {
  if (member.value?.type === 'ArrowFunctionExpression')
    return true

  return member.value?.type === 'CallExpression'
    && member.typeAnnotation == null
}
