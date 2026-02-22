import type {ImportDeclaration} from 'estree'
import type {ImportGroup} from './ImportGroup'

export interface CategorizedImport {
  declaration: ImportDeclaration
  group: ImportGroup
  sortKey: string
}
