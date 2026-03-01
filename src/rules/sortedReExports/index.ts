import {categorizeReExports} from './categorizeReExports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createFix} from './createFix'
import {getReExportGroups} from './getReExportGroups'
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
        const reExportGroups = getReExportGroups(body)
        if (reExportGroups.length === 0)
          return

        const allErrors: ReExportError[] = []

        // Check each re-export group independently
        for (const group of reExportGroups) {
          const categorized = categorizeReExports(group)
          const errors: ReExportError[] = [
            ...checkGroupOrdering(categorized),
            ...checkAlphabeticalSorting(categorized),
            ...checkSpecifiersSorting(categorized),
          ]
          allErrors.push(...errors)
        }

        for (const error of allErrors) {
          context.report({
            node: error.node,
            messageId: error.messageId,
            fix(fixer) {
              const sourceCode = context.sourceCode
              return createFix(fixer, reExportGroups, sourceCode)
            },
          })
        }
      },
    }
  },
}
