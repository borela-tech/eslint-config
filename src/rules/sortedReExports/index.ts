import {categorizeReExports} from './categorizeReExports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createReExportFix} from './createFix'
import {getReExportGroups} from './getReExportGroups'
import type {MessageIds} from './MessageIds'
import type {ReExportValidationError} from './ReExportValidationError'
import type {TSESLint} from '@typescript-eslint/utils'
import type {TSESTree} from '@typescript-eslint/utils'

export const sortedReExports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      Program(node: TSESTree.Program): void {
        const programBody = node.body
        const reExportGroups = getReExportGroups(programBody)
        if (reExportGroups.length === 0)
          return

        const allReExportErrors: ReExportValidationError[] = []

        // Check each re-export group independently
        for (const group of reExportGroups) {
          const categorizedReExports = categorizeReExports(group)
          const groupErrors: ReExportValidationError[] = [
            ...checkGroupOrdering(categorizedReExports),
            ...checkAlphabeticalSorting(categorizedReExports),
            ...checkSpecifiersSorting(categorizedReExports),
          ]
          allReExportErrors.push(...groupErrors)
        }

        for (const error of allReExportErrors) {
          context.report({
            fix(fixer) {
              const sourceCode = context.sourceCode
              return createReExportFix(fixer, reExportGroups, sourceCode)
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
