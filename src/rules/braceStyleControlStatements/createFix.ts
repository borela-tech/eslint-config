import type {SourceCode} from './SourceCode'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function createFix(
  fixer: TSESLint.RuleFixer,
  body: TSESTree.Statement,
  sourceCode: SourceCode,
): TSESLint.RuleFix | null {
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

function getIndentation(
  node: TSESTree.Statement,
  sourceCode: SourceCode,
): string {
  const tokenBeforeBody = sourceCode.getTokenBefore(node)
  if (!tokenBeforeBody)
    return ''

  const line = sourceCode.getText().split('\n')[tokenBeforeBody.loc.start.line - 1]
  if (!line)
    return ''

  const match = line.match(/^(\s*)/)
  return match?.[1] ?? ''
}
