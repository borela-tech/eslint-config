import {isNodeWithType} from './isNodeWithType'
import type {TSESTree} from '@typescript-eslint/utils'

const SKIP_KEYS = new Set(['loc', 'parent', 'range'])

export function getChildNodes(node: TSESTree.Node): TSESTree.Node[] {
  const children: TSESTree.Node[] = []

  for (const key of Object.keys(node)) {
    if (SKIP_KEYS.has(key))
      continue

    const value = (node as unknown as Record<string, unknown>)[key]

    if (Array.isArray(value)) {
      for (const item of value) {
        if (isNodeWithType(item))
          children.push(item)
      }
    } else if (isNodeWithType(value))
      children.push(value)
  }

  return children
}
