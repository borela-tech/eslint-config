import {categorizeImport} from './categorizeImport'
import {getImportSortKey} from './getImportSortKey'
import type {CategorizedImport} from './CategorizedImport'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeImports(
  declarations: TSESTree.ImportDeclaration[],
): CategorizedImport[] {
  return declarations.map(declaration => ({
    declaration,
    group: categorizeImport(declaration),
    sortKey: getImportSortKey(declaration),
  }))
}
