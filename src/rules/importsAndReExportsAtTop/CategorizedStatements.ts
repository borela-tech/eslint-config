import type {ReExport} from './ReExport'
import type {TSESTree} from '@typescript-eslint/types'

export interface CategorizedStatements {
  imports: TSESTree.ImportDeclaration[]
  reExports: ReExport[]
  other: TSESTree.Statement[]
}
