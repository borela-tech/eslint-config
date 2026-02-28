import {areSpecifiersSorted} from '../areSpecifiersSorted'
import {getNamedSpecifiers} from '../getNamedSpecifiers'
import {sortSpecifiersText} from '../sortSpecifiersText'
import type {TSESTree} from '@typescript-eslint/types'

export function formatNamedImport(
  declaration: TSESTree.ImportDeclaration,
  sourceCode: {getText: (node?: unknown) => string},
): string {
  const specifiers = getNamedSpecifiers(declaration)

  if (specifiers.length > 1 && !areSpecifiersSorted(specifiers)) {
    const sortedSpecifiers = sortSpecifiersText(specifiers, sourceCode)
    const source = declaration.source.value
    const prefix = declaration.importKind === 'type' ? 'import type ' : 'import '
    return `${prefix}{${sortedSpecifiers}} from '${source}'`
  }

  return sourceCode.getText(declaration)
}
