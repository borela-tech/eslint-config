import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export interface ReExportError {
  messageId:
    | 'sortedNames'
    | 'sortedReExports'
    | 'wrongGroup'
  node: ReExportDeclaration
}
