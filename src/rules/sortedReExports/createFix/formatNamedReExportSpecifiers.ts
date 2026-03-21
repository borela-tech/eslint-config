import {areSpecifiersSorted} from '../areSpecifiersSorted'
import {getReExportNamedSpecifiers} from '../getReExportNamedSpecifiers'
import {sortSpecifiersText} from '../sortSpecifiersText'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function formatNamedReExportSpecifiers(
  declaration: TSESTree.ExportNamedDeclaration,
  sourceCode: TSESLint.SourceCode,
): string {
  const specifiers = getReExportNamedSpecifiers(declaration)

  if (specifiers.length > 1 && !areSpecifiersSorted(specifiers)) {
    const sortedSpecifiers = sortSpecifiersText(specifiers, sourceCode)
    const source = declaration.source!.value
    const prefix = declaration.exportKind === 'type' ? 'export type ' : 'export '
    return `${prefix}{${sortedSpecifiers}} from '${source}'`
  }

  return sourceCode.getText(declaration)
}
