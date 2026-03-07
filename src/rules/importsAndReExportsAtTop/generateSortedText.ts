import type {CategorizedStatements} from './CategorizedStatements'
import type {TSESLint} from '@typescript-eslint/utils'

export function generateSortedText(
  context: TSESLint.RuleContext<'importsAndReExportsAtTop', []>,
  categories: CategorizedStatements,
): string {
  const allStatements = [
    ...categories.imports,
    ...categories.reExports,
    ...categories.other,
  ]
  return allStatements.map(
    node => context.sourceCode.getText(node),
  ).join('\n')
}
