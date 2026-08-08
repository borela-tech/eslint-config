import {getInlineObjectLength} from './getInlineObjectLength'
import type {Braces} from './Braces'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getCollapsedLineLength(
  sourceCode: TSESLint.SourceCode,
  properties: TSESTree.Property[],
  braces: Braces,
): number {
  const inlineLength = getInlineObjectLength(sourceCode, properties)
  const prefixLength = braces.openingBrace.loc.start.column
  const closingLine = sourceCode.lines[braces.closingBrace.loc.end.line - 1] ?? ''
  const suffixLength = closingLine.length - braces.closingBrace.loc.end.column
  return prefixLength + inlineLength + suffixLength
}
