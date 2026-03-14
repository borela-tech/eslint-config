import type {TSESTree} from '@typescript-eslint/types'

export function getNamedSpecifiers(
  declaration: TSESTree.ImportDeclaration,
): TSESTree.ImportSpecifier[] {
  return declaration.specifiers.filter(
    (s): s is TSESTree.ImportSpecifier => s.type === 'ImportSpecifier',
  )
}
