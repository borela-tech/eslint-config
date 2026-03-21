import {areSpecifiersSorted} from '../areSpecifiersSorted'
import {getImportNamedSpecifiers} from '../getImportNamedSpecifiers'
import {sortImportSpecifiersText} from '../sortImportSpecifiersText'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export function formatNamedImportSpecifiers(
  declaration: TSESTree.ImportDeclaration,
  sourceCode: TSESLint.SourceCode,
): string {
  const specifiers = getImportNamedSpecifiers(declaration)

  if (specifiers.length > 1 && !areSpecifiersSorted(specifiers)) {
    const sortedSpecifiers = sortImportSpecifiersText(specifiers, sourceCode)
    const source = declaration.source.value
    const prefix = declaration.importKind === 'type' ? 'import type ' : 'import '
    return `${prefix}{${sortedSpecifiers}} from '${source}'`
  }

  return sourceCode.getText(declaration)
}
