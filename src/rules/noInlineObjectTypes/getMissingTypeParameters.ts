import {collectTypeParameterReferences} from '../shared/collectTypeParameterReferences'
import {findTypeParameterDeclarer} from '../shared/findTypeParameterDeclarer'
import {getTypeParametersOf} from '../shared/getTypeParametersOf'
import {isAncestorOf} from '../shared/isAncestorOf'
import {isNodeWithType} from '../shared/isNodeWithType'
import type {TSESTree} from '@typescript-eslint/utils'
import type {TypeParameterDeclarer} from '../shared/TypeParameterDeclarer'

export function getMissingTypeParameters(
  annotationNode: TSESTree.TSTypeAnnotation,
  typeLiteral: TSESTree.TSTypeLiteral,
  insertLocation: TSESTree.Node,
): TSESTree.TSTypeParameter[] {
  const queue: TypeParameterDeclarer[] = []

  for (const name of collectTypeParameterReferences(typeLiteral)) {
    const found = findTypeParameterDeclarer(annotationNode, name)
    if (found && !isAncestorOf(found.declarer, insertLocation))
      queue.push(found)
  }

  const included = new Set<TSESTree.TSTypeParameter>()
  const missing: TypeParameterDeclarer[] = []

  let current = queue.shift()
  while (current) {
    if (!included.has(current.param)) {
      included.add(current.param)
      missing.push(current)
      queue.push(...findConstraintParameters(
        annotationNode,
        current.param,
        insertLocation,
      ))
    }
    current = queue.shift()
  }

  return sortByDeclarationOrder(missing).map(item => item.param)
}

function findConstraintParameters(
  annotationNode: TSESTree.Node,
  param: TSESTree.TSTypeParameter,
  insertLocation: TSESTree.Node,
): TypeParameterDeclarer[] {
  const dependencies: TypeParameterDeclarer[] = []
  const sources: unknown[] = [param.constraint, param.default]

  for (const source of sources) {
    if (isNodeWithType(source)) {
      for (const name of collectTypeParameterReferences(source)) {
        const found = findTypeParameterDeclarer(annotationNode, name)
        if (found && !isAncestorOf(found.declarer, insertLocation))
          dependencies.push(found)
      }
    }
  }

  return dependencies
}

function sortByDeclarationOrder(
  items: TypeParameterDeclarer[],
): TypeParameterDeclarer[] {
  return [...items].sort((first, second) => compareOrder(first, second))
}

function compareOrder(
  first: TypeParameterDeclarer,
  second: TypeParameterDeclarer,
): number {
  const depthDifference = getDepth(first.declarer) - getDepth(second.declarer)
  if (depthDifference !== 0)
    return depthDifference
  return getParamIndex(first) - getParamIndex(second)
}

function getDepth(node: TSESTree.Node): number {
  let depth = 0
  let current = node.parent as TSESTree.Node | undefined

  while (current) {
    depth += 1
    current = current.parent as TSESTree.Node | undefined
  }

  return depth
}

function getParamIndex(item: TypeParameterDeclarer): number {
  const declaration = getTypeParametersOf(item.declarer)
  return declaration?.params.indexOf(item.param) ?? 0
}
