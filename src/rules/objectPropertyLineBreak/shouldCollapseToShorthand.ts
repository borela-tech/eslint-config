import {canConvertToShorthand} from './canConvertToShorthand'
import {getInlineObjectLength} from './getInlineObjectLength'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function shouldCollapseToShorthand(
  properties: TSESTree.Property[],
  sourceCode: TSESLint.SourceCode,
  maxLength: number,
): boolean {
  const anyShorthand = properties.some(p => p.shorthand)
  const allCanConvert = properties.every(canConvertToShorthand)
  const shorthandLength = allCanConvert
    ? getInlineObjectLength(sourceCode, properties)
    : Infinity

  return !anyShorthand && allCanConvert && shorthandLength <= maxLength
}
