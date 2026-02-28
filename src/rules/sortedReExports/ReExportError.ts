import type {ReExportDeclaration} from './ReExportDeclaration'

export interface ReExportError {
  node: ReExportDeclaration
  messageId: 'sortedReExports' | 'sortedNames' | 'wrongGroup'
}
