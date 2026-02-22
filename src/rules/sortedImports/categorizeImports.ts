import type {ImportDeclaration} from 'estree'
import type {CategorizedImport} from './CategorizedImport'
import {categorizeImport} from './categorizeImport'
import {getSortKey} from './getSortKey'

export function categorizeImports(declarations: ImportDeclaration[]): CategorizedImport[] {
  return declarations.map(declaration => ({
    declaration,
    group: categorizeImport(declaration),
    sortKey: getSortKey(declaration),
  }))
}
