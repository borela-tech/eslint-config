import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function formatTypeLiteral(
  sourceCode: TSESLint.SourceCode,
  typeLiteral: TSESTree.TSTypeLiteral,
  baseIndent: string,
): string {
  const members = typeLiteral.members
  if (members.length === 0)
    return '{}'

  const memberTexts = members.map(member => {
    if (member.type === 'TSPropertySignature') {
      const memberText = sourceCode.getText(member)
      return memberText.replace(/,\s*$/, '')
    }
    return sourceCode.getText(member).replace(/,\s*$/, '')
  })

  const innerIndent = baseIndent + '  '
  return `{\n${innerIndent}${memberTexts.join(`\n${innerIndent}`)}\n${baseIndent}}`
}
