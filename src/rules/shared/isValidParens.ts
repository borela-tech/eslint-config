import type {Parens} from './Parens'

export function isValidParens(parens: null | Parens): parens is Parens {
  if (!parens)
    return false
  return parens.openingParen.value === '(' && parens.closingParen.value === ')'
}
