import type {Parens} from './Parens'

export function isValidParens(parens: Parens | null): parens is Parens {
  if (!parens)
    return false
  return parens.openingParen.value === '(' && parens.closingParen.value === ')'
}
