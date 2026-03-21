import {getNameFromDeclaration} from './getNameFromDeclaration'
import {getNamesFromSpecifiers} from './getNamesFromSpecifiers'
import type {TSESTree} from '@typescript-eslint/utils'

export function getExportedNames(
  node: TSESTree.ExportNamedDeclaration,
): string[] {
  const specifierNames = getNamesFromSpecifiers(node)

  if (!node.declaration)
    return specifierNames

  const declarationNames = getNameFromDeclaration(node.declaration)

  return [...specifierNames, ...declarationNames]
}
