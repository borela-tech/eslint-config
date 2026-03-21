import {getIndentation} from './getIndentation'
import type {SourceCode} from './SourceCode'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function createBraceStyleFix(
  fixer: TSESLint.RuleFixer,
  body: TSESTree.Statement,
  sourceCode: SourceCode,
): null | TSESLint.RuleFix {
  if (body.type === 'BlockStatement') {
    const firstToken = sourceCode.getFirstToken(body)
    if (!firstToken)
      return null

    return fixer.insertTextBefore(firstToken, '\n')
  }

  const bodyText = sourceCode.getText(body)
  const indentation = getIndentation(body, sourceCode)
  const fixedText = `{\n${indentation}  ${bodyText}\n${indentation}}`

  return fixer.replaceText(body, fixedText)
}
