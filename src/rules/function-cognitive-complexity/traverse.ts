import {getChildNodes} from './getChildNodes'
import {isIncrementableControlFlow} from './isIncrementableControlFlow'
import type {ComplexityState} from './ComplexityState'
import type {TSESTree} from '@typescript-eslint/utils'

export function traverse(
  node: TSESTree.Node,
  nestingLevel: number,
  state: ComplexityState,
): void {
  if (isIncrementableControlFlow(node)) {
    state.complexity += 1 + nestingLevel
    nestingLevel++
  }

  const children = getChildNodes(node)

  for (const child of children) {
    traverse(child, nestingLevel, state)
  }
}
