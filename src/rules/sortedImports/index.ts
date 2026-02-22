import {categorizeImports} from './categorizeImports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createFix} from './createFix'
import {getImportDeclarations} from './getImportDeclarations'
import type {ImportError} from './ImportError'
import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

export const sortedImports: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'Enforce sorted imports alphabetically',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      sortedImports: 'Imports should be sorted alphabetically',
      sortedNames: 'Named imports should be sorted alphabetically',
      wrongGroup: 'Import is in wrong group',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    return {
      Program(node) {
        const body = node.body as TSESTree.ProgramStatement[]
        const declarations = getImportDeclarations(body)
        if (declarations.length === 0)
          return

        const categorized = categorizeImports(declarations)
        const errors: ImportError[] = [
          ...checkGroupOrdering(categorized),
          ...checkAlphabeticalSorting(categorized),
          ...checkSpecifiersSorting(categorized),
        ]

        for (const error of errors) {
          context.report({
            node: error.node,
            messageId: error.messageId,
            fix(fixer) {
              const sourceCode = context.sourceCode
              return createFix(fixer, declarations, sourceCode, body)
            },
          })
        }
      },
    }
  },
}
