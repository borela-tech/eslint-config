import {detectIndentStep} from '../shared/detectIndentStep'
import type {Braces} from './Braces'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function buildMultilineFix(
  fixer: TSESLint.RuleFixer,
  braces: Braces,
  properties: TSESTree.Property[],
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const indentStep = detectIndentStep(sourceCode)
  const lineIndent = sourceCode
    .getLines()[braces.openingBrace.loc.start.line - 1]
    .match(/^\s*/)?.[0] ?? ''
  const indent = lineIndent + ' '.repeat(indentStep)

  const lines: string[] = ['{']
  for (const prop of properties) {
    const propText = sourceCode.getText(prop)
    lines.push(`${indent}${propText},`)
  }
  lines.push(`${lineIndent}}`)

  return fixer.replaceTextRange(
    [braces.openingBrace.range[0], braces.closingBrace.range[1]],
    lines.join('\n'),
  )
}
