import {TypeFormatFlags} from 'typescript'
import type ts from 'typescript'
import type {FunctionNode} from './FunctionNode'
import type {TSESLint} from '@typescript-eslint/utils'

export function getReturnTypeFromChecker(
  context: TSESLint.RuleContext<string, []>,
  node: FunctionNode,
): string | undefined {
  const parserServices = context.sourceCode.parserServices
  if (!parserServices)
    return undefined

  const program = parserServices.program
  const esTreeNodeToTSNodeMap = parserServices.esTreeNodeToTSNodeMap
  if (!program || !esTreeNodeToTSNodeMap)
    return undefined

  const checker = program.getTypeChecker()
  const tsNode = esTreeNodeToTSNodeMap.get(node)
  if (!tsNode)
    return undefined

  const signature = checker.getSignatureFromDeclaration(
    tsNode as ts.SignatureDeclaration,
  )
  if (!signature)
    return undefined

  const returnType = checker.getReturnTypeOfSignature(signature)
  return checker.typeToString(
    returnType,
    undefined,
    TypeFormatFlags.UseFullyQualifiedType,
  )
}
