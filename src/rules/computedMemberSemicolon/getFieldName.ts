import {getKeyName} from '../shared/getKeyName'
import type {FieldLike} from '../shared/FieldLike'
import type {TSESLint} from '@typescript-eslint/utils'

export function getFieldName(
  field: FieldLike,
  sourceCode: TSESLint.SourceCode,
): string {
  if (field.computed)
    return `[${sourceCode.getText(field.key)}]`

  return getKeyName(field.key, sourceCode)
}
