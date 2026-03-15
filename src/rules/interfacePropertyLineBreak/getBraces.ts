import type {Braces} from './Braces'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function getBraces(
  sourceCode: TSESLint.SourceCode,
  body: TSESTree.TSInterfaceBody,
): Braces | null {
  const openingBrace = sourceCode.getTokenBefore(body.body[0])
  const closingBrace = sourceCode.getTokenAfter(body.body[body.body.length - 1])

  if (!openingBrace || !closingBrace)
    return null

  return {closingBrace, openingBrace}
}
