import type {TSESLint} from '@typescript-eslint/utils'

export function getLineStartIndex(
  sourceCode: TSESLint.SourceCode,
  line: number,
): number {
  const lines = sourceCode.getLines()
  return lines.slice(0, line - 1).reduce(
    (acc, l) => acc + l.length + 1,
    0,
  )
}
