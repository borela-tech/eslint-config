import type {TSESTree} from '@typescript-eslint/utils'

export function isPropertySignatureInTypeLiteral(
  parent: TSESTree.Node | undefined,
): boolean {
  return parent?.type === 'TSPropertySignature'
    && (
      parent.parent?.type === 'TSTypeLiteral'
      || parent.parent?.type === 'TSInterfaceBody'
    )
}
