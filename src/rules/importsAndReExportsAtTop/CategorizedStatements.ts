import type {ReExportDeclaration} from '@lib/ReExportDeclaration'
import type {TSESTree} from '@typescript-eslint/types'

export interface CategorizedStatements {
  imports: TSESTree.ImportDeclaration[]
  other: TSESTree.Statement[]
  reExports: ReExportDeclaration[]
}
