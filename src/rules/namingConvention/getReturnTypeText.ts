import type {FunctionNode} from './FunctionNode'
import type {TSESLint} from '@typescript-eslint/utils'

export function getReturnTypeText(
  sourceCode: TSESLint.SourceCode,
  node: FunctionNode,
): string | undefined {
  if (!node.returnType)
    return undefined
  return sourceCode.getText(node.returnType.typeAnnotation)
}
