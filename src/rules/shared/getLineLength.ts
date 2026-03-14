import type {TSESLint} from '@typescript-eslint/utils'

export function getLineLength(
  sourceCode: TSESLint.SourceCode,
  lineNumber: number,
): number {
  const line = sourceCode.getLines()[lineNumber - 1]
  return line?.length ?? 0
}
