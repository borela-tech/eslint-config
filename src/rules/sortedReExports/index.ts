import {categorizeReExports} from './categorizeReExports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createFix} from './createFix'
import {getReExportGroups} from './getReExportGroups'
import type {MessageIds} from './MessageIds'
import type {ReExportError} from './ReExportError'
import type {TSESLint} from '@typescript-eslint/utils'

export const sortedReExports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      Program(node) {
        const body = node.body
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
            fix(fixer) {
              const sourceCode = context.sourceCode
              return createFix(fixer, reExportGroups, sourceCode)
            },
            messageId: error.messageId,
            node: error.node,
          })
        }
      },
    }
  },
  meta: {
    docs: {
      description: 'Enforce sorted exports alphabetically',
    },
    fixable: 'code',
    messages: {
      sortedNames: 'Named exports should be sorted alphabetically',
      sortedReExports: 'Exports should be sorted alphabetically',
      wrongGroup: 'Export is in wrong group',
    },
    schema: [],
    type: 'suggestion',
  },
}
