import {categorizeImport} from './categorizeImport'
import {getSortKey} from './getSortKey'
import type {CategorizedImport} from './CategorizedImport'
import type {TSESTree} from '@typescript-eslint/types'

export function categorizeImports(
  declarations: TSESTree.ImportDeclaration[],
): CategorizedImport[] {
  return declarations.map(declaration => ({
    declaration,
    group: categorizeImport(declaration),
    sortKey: getSortKey(declaration),
  }))
}
