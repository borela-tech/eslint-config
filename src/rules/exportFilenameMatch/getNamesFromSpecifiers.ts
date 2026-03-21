import type {TSESTree} from '@typescript-eslint/utils'

export function getNamesFromSpecifiers(
  node: TSESTree.ExportNamedDeclaration,
): string[] {
  if (!node.specifiers?.length)
    return []

  const names: string[] = []
  for (const specifier of node.specifiers) {
    if (specifier.exported.type === 'Identifier')
      names.push(specifier.exported.name)
  }
  return names
}
