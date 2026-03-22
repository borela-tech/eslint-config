import {createFunctionFixer} from './createFunctionFixer'
import {getFunctionReportNode} from './getFunctionReportNode'
import {isPascalCase} from './isPascalCase'
import {toPascalCase} from './toPascalCase'
import type {FunctionNode} from './FunctionNode'
import type {MessageId} from './MessageId'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/types'

export function reportComponentViolation(
  node: FunctionNode,
  parent: TSESTree.Node | undefined,
  name: string,
  context: TSESLint.RuleContext<MessageId, []>,
): void {
  if (isPascalCase(name))
    return

  context.report({
    data: {
      name,
      type: 'React component',
    },
    fix: createFunctionFixer(node, parent, toPascalCase),
    messageId: 'notPascalCase',
    node: getFunctionReportNode(node, parent),
  })
}
