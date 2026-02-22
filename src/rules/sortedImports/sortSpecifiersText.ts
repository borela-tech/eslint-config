import type {ImportSpecifier} from 'estree'
import {getSpecifierName} from './getSpecifierName'

export function sortSpecifiersText(
  specifiers: ImportSpecifier[],
  sourceCode: {getText: (node: ImportSpecifier) => string},
): string {
  const sorted = [...specifiers].sort((a, b) => {
    const lowerA = getSpecifierName(a).toLowerCase()
    const lowerB = getSpecifierName(b).toLowerCase()
    return lowerA.localeCompare(lowerB)
  })
  return sorted.map(s => sourceCode.getText(s)).join(', ')
}
