import {getTypeParametersOf} from './getTypeParametersOf'
import {isNodeWithType} from './isNodeWithType'
import type {TSESTree} from '@typescript-eslint/utils'

export function collectTypeParameterReferences(
  node: TSESTree.Node,
): Set<string> {
  const references = new Set<string>()
  collectReferences(node, new Set<string>(), references)
  return references
}

function collectReferences(
  node: TSESTree.Node,
  shadowed: Set<string>,
  references: Set<string>,
): void {
  if (node.type === 'TSTypeReference')
    collectEntityName(node.typeName, shadowed, references)

  let visible = shadowed
  const declaration = getTypeParametersOf(node)
  if (declaration) {
    visible = new Set(shadowed)
    for (const param of declaration.params)
      visible.add(param.name.name)
  }

  for (const key in node) {
    if (key === 'parent')
      continue
    collectValue(
      (node as unknown as Record<string, unknown>)[key],
      visible,
      references,
    )
  }
}

function collectEntityName(
  name: TSESTree.TSTypeReference['typeName'],
  shadowed: Set<string>,
  references: Set<string>,
): void {
  let current = name
  while (current.type === 'TSQualifiedName')
    current = current.left

  if (current.type === 'Identifier' && !shadowed.has(current.name))
    references.add(current.name)
}

function collectValue(
  value: unknown,
  shadowed: Set<string>,
  references: Set<string>,
): void {
  if (Array.isArray(value)) {
    for (const item of value)
      collectValue(item, shadowed, references)
    return
  }

  if (isNodeWithType(value))
    collectReferences(value, shadowed, references)
}
