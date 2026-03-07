import type {ReExportDeclaration} from '@lib/ReExportDeclaration'

export interface ReExportError {
  node: ReExportDeclaration
  messageId:
    | 'sortedReExports'
    | 'sortedNames'
    | 'wrongGroup'
}
