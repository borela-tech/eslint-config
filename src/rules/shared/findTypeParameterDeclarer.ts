import {getTypeParametersOf} from './getTypeParametersOf'
import type {TSESTree} from '@typescript-eslint/utils'
import type {TypeParameterDeclarer} from './TypeParameterDeclarer'

export function findTypeParameterDeclarer(
  node: TSESTree.Node,
  name: string,
): TypeParameterDeclarer | undefined {
  let current = node.parent as TSESTree.Node | undefined

  while (current) {
    const declaration = getTypeParametersOf(current)
    const param = declaration?.params.find(param => param.name.name === name)
    if (param) {
      return {
        declarer: current,
        param,
      }
    }
    current = current.parent as TSESTree.Node | undefined
  }

  return undefined
}
