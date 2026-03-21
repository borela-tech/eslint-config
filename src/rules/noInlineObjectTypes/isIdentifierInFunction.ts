import type {TSESTree} from '@typescript-eslint/utils'

export function isIdentifierInFunction(
  parent: TSESTree.Node | undefined,
): boolean {
  return parent?.type === 'Identifier'
    && (
      parent.parent?.type === 'FunctionDeclaration'
      || parent.parent?.type === 'FunctionExpression'
      || parent.parent?.type === 'ArrowFunctionExpression'
    )
}
