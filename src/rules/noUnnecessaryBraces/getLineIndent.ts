import type {TSESLint} from '@typescript-eslint/utils'

export function getLineIndent(
  sourceCode: TSESLint.SourceCode,
  line: number,
): string {
  const text = sourceCode.getText()
  const lines = text.split('\n')
  const lineText = lines[line - 1] ?? ''
  const match = lineText.match(/^(\s*)/)
  return match?.[1] ?? ''
}
