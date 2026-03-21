import {getChildNodes} from './getChildNodes'
import {traverse} from './traverse'
import type {ComplexityState} from './ComplexityState'
import type {TSESTree} from '@typescript-eslint/utils'

export function calculateCognitiveComplexity(
  node: TSESTree.Node,
): number {
  const state: ComplexityState = {
    complexity: 0,
    nestingLevel: 0,
  }

  const children = getChildNodes(node)

  for (const child of children) {
    traverse(child, 0, state)
  }

  return state.complexity
}
