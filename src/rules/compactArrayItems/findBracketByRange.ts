import type {TSESLint} from '@typescript-eslint/utils'

export function findBracketByRange(
  tokens: readonly TSESLint.AST.Token[] | undefined,
  range: readonly [number, number],
  value: string,
): TSESLint.AST.Token | undefined {
  return tokens?.find(
    t => t.range[0] === range[0] && t.value === value,
  )
}
