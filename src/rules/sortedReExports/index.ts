import {categorizeReExports} from './categorizeReExports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createFix} from './createFix'
import {getReExportDeclarations} from './getReExportDeclarations'
import type {ReExportError} from './ReExportError'
import type {Rule} from 'eslint'
import type {TSESTree} from '@typescript-eslint/types'

export const sortedReExports: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'Enforce sorted exports alphabetically',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      sortedReExports: 'Exports should be sorted alphabetically',
      sortedNames: 'Named exports should be sorted alphabetically',
      wrongGroup: 'Export is in wrong group',
    },
    schema: [],
    type: 'suggestion',
  },
  create(context) {
    return {
      Program(node) {
        const body = node.body as TSESTree.ProgramStatement[]
        const declarations = getReExportDeclarations(body)
        if (declarations.length === 0)
          return

        const categorized = categorizeReExports(declarations)
        const errors: ReExportError[] = [
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
