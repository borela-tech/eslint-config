import {getNameFromDeclaration} from './getNameFromDeclaration'
import {getNamesFromSpecifiers} from './getNamesFromSpecifiers'
import type {TSESTree} from '@typescript-eslint/utils'

export function getExportedNames(
  node: TSESTree.ExportNamedDeclaration,
): string[] {
  return node.declaration
    ? getNameFromDeclaration(node.declaration)
    : getNamesFromSpecifiers(node)
}
