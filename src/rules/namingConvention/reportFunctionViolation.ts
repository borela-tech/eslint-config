import {createFunctionFixer} from './createFunctionFixer'
import {getFunctionReportNode} from './getFunctionReportNode'
import {isCamelCase} from './isCamelCase'
import {toCamelCase} from './toCamelCase'
import type {FunctionNode} from './FunctionNode'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function reportFunctionViolation(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
  name: string,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (isCamelCase(name))
    return

  context.report({
    data: {name},
    fix: createFunctionFixer(node, parent, toCamelCase),
    messageId: 'notCamelCase',
    node: getFunctionReportNode(node, parent),
  })
}
