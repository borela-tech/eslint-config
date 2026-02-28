import {areSpecifiersSorted} from '../areSpecifiersSorted'
import {getNamedSpecifiers} from '../getNamedSpecifiers'
import {sortSpecifiersText} from '../sortSpecifiersText'
import type {TSESTree} from '@typescript-eslint/types'

export function formatNamedReExport(
  declaration: TSESTree.ExportNamedDeclaration,
  sourceCode: {getText: (node?: unknown) => string},
): string {
  const specifiers = getNamedSpecifiers(declaration)

  if (specifiers.length > 1 && !areSpecifiersSorted(specifiers)) {
    const sortedSpecifiers = sortSpecifiersText(specifiers, sourceCode)
    const source = declaration.source!.value
    const prefix = declaration.exportKind === 'type' ? 'export type ' : 'export '
    return `${prefix}{${sortedSpecifiers}} from '${source}'`
  }

  return sourceCode.getText(declaration)
}
