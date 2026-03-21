import {getPropertyName} from './getPropertyName'
import type {Braces} from './Braces'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function buildShorthandFix(
  fixer: TSESLint.RuleFixer,
  braces: Braces,
  properties: TSESTree.Property[],
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const names = properties.map(p => getPropertyName(sourceCode, p))

  return fixer.replaceTextRange(
    [braces.openingBrace.range[0], braces.closingBrace.range[1]],
    `{${names.join(', ')}}`,
  )
}
