import type {TSESLint} from '@typescript-eslint/utils'

export function findClosingBracketByRange(
  tokens: readonly TSESLint.AST.Token[] | undefined,
  range: readonly [number, number],
): TSESLint.AST.Token | undefined {
  return tokens?.find(
    t => t.range[1] === range[1] && t.value === ']',
  )
}
