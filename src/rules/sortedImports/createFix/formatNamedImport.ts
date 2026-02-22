import {areSpecifiersSorted} from '../areSpecifiersSorted'
import {getNamedSpecifiers} from '../getNamedSpecifiers'
import {sortSpecifiersText} from '../sortSpecifiersText'
import type {ImportDeclaration} from 'estree'

export function formatNamedImport(
  declaration: ImportDeclaration,
  sourceCode: {getText: (node?: unknown) => string},
): string {
  const specifiers = getNamedSpecifiers(declaration)

  if (specifiers.length > 1 && !areSpecifiersSorted(specifiers)) {
    const importText = sourceCode.getText(declaration)
    const specifiersStart = importText.indexOf('{')
    const specifiersEnd = importText.lastIndexOf('}')
    const before = importText.substring(0, specifiersStart + 1)
    const after = importText.substring(specifiersEnd)
    const sortedSpecifiers = sortSpecifiersText(specifiers, sourceCode)
    return before + ' ' + sortedSpecifiers + ' ' + after
  }

  return sourceCode.getText(declaration)
}
