import type {ImportDeclaration} from 'estree'

export interface ImportError {
  node: ImportDeclaration
  messageId: 'sortedImports' | 'sortedNames' | 'wrongGroup'
}
