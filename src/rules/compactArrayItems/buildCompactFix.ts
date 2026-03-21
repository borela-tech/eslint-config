import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function buildCompactFix(
  fixer: TSESLint.RuleFixer,
  openingBracket: TSESLint.AST.Token,
  closingBracket: TSESLint.AST.Token,
  elements: (null | TSESTree.Node)[],
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const nonNullElements = elements.filter(
    (el): el is NonNullable<typeof el> => el !== null,
  )

  const formattedItems = nonNullElements
    .map(element => sourceCode.getText(element))
    .join(', ')

  const newText = `[${formattedItems}]`

  return fixer.replaceTextRange(
    [openingBracket.range[0], closingBracket.range[1]],
    newText,
  )
}
