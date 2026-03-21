import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export interface ReExportValidationError {
  messageId:
    | 'sortedNames'
    | 'sortedReExports'
    | 'wrongGroup'
  node: ReExportDeclaration
}
