import type {TSESTree} from '@typescript-eslint/utils'

export function getExportedNames(
  node: TSESTree.ExportNamedDeclaration,
): string[] {
  const names: string[] = []

  // Handle re-exports: export { foo } from './bar'
  if (node.specifiers?.length) {
    for (const specifier of node.specifiers) {
      if (specifier.exported.type === 'Identifier') {
        names.push(specifier.exported.name)
      }
    }
  }

  // Handle direct declarations: export function foo() {}
  if (node.declaration) {
    const decl = node.declaration

    if (decl.type === 'FunctionDeclaration' && decl.id) {
      names.push(decl.id.name)
    } else if (decl.type === 'ClassDeclaration' && decl.id) {
      names.push(decl.id.name)
    } else if (decl.type === 'VariableDeclaration') {
      for (const d of decl.declarations) {
        if (d.id.type === 'Identifier') {
          names.push(d.id.name)
        }
      }
    } else if (decl.type === 'TSInterfaceDeclaration') {
      names.push(decl.id.name)
    } else if (decl.type === 'TSTypeAliasDeclaration') {
      names.push(decl.id.name)
    }
  }

  return names
}
