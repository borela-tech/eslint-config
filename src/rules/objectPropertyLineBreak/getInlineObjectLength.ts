import {getPropertyText} from './getPropertyText'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getInlineObjectLength(
  sourceCode: TSESLint.SourceCode,
  properties: TSESTree.Property[],
): number {
  if (properties.length === 0)
    return 2

  const propLengths = properties.map(p => getPropertyText(sourceCode, p).length)
  const propsTotal = propLengths.reduce((a, b) => a + b, 0)
  const commas = Math.max(0, properties.length - 1)

  return 2 + propsTotal + commas
}
