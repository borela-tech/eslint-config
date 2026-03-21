import {getLineIndent} from '../shared/getLineIndent'
import type {Brackets} from './Brackets'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function buildMultilineFix(
  fixer: TSESLint.RuleFixer,
  brackets: Brackets,
  elements: (null | TSESTree.Node)[],
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const openingLine = brackets.openingBracket.loc.start.line
  const baseIndent = getLineIndent(sourceCode, openingLine)
  const itemIndent = baseIndent + '  '

  const nonNullElements = elements
    .filter((el): el is TSESTree.Node => el !== null)

  const formattedItems = nonNullElements
    .map(element => {
      const text = sourceCode.getText(element)
      return `${itemIndent}${text}`
    })
    .join(',\n')

  const newText = `\n${formattedItems},\n${baseIndent}`

  return fixer.replaceTextRange(
    [brackets.openingBracket.range[1], brackets.closingBracket.range[0]],
    newText,
  )
}
