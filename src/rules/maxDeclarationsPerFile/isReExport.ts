import type {TSESTree} from '@typescript-eslint/utils'

export function isReExport(parent: TSESTree.Node | undefined): boolean {
  return parent?.type === 'ExportNamedDeclaration'
    && parent.source !== null
}
