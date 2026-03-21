import {isShorthandProperty} from './isShorthandProperty'
import type {TSESTree} from '@typescript-eslint/types'

export function areAllShorthand(properties: TSESTree.Property[]): boolean {
  return properties.every(isShorthandProperty)
}
