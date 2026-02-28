import {Rule} from 'eslint'
import type {CategorizedStatements} from './CategorizedStatements'
import type {Node as ESTreeNode} from 'estree'
import type {TSESTree} from '@typescript-eslint/types'

export function generateSortedText(
  context: Rule.RuleContext,
  categories: CategorizedStatements,
): string {
  const allStatements: TSESTree.Node[] = [
    ...categories.imports,
    ...categories.reExports,
    ...categories.other,
  ]
  return allStatements.map(
    node => context.sourceCode.getText(node as ESTreeNode),
  ).join('\n')
}
