import type {ImportGroup} from './ImportGroup'
import type {TSESTree} from '@typescript-eslint/types'

export interface CategorizedImport {
  declaration: TSESTree.ImportDeclaration
  group: ImportGroup
  sortKey: string
}
