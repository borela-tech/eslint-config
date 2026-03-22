import {getFunctionIdentifierNodeForFixer} from './getFunctionIdentifierNodeForFixer'
import {getFunctionNameForFixer} from './getFunctionNameForFixer'
import type {FunctionNode} from './FunctionNode'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function createFunctionFixer(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
  convert: (name: string) => string,
): TSESLint.ReportFixFunction {
  return fixer => {
    const fixedName = convert(getFunctionNameForFixer(node, parent))
    const identifierNode = getFunctionIdentifierNodeForFixer(node, parent)

    if (identifierNode)
      return fixer.replaceText(identifierNode, fixedName)

    return null
  }
}
