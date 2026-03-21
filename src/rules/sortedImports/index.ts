import {categorizeImports} from './categorizeImports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createFix} from './createFix'
import {getImportGroups} from './getImportGroups'
import type {ImportError} from './ImportError'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const sortedImports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      Program(node) {
        const body = node.body
        const importGroups = getImportGroups(body)
        if (importGroups.length === 0)
          return

        const allErrors: ImportError[] = []

        // Check each import group independently
        for (const group of importGroups) {
          const categorized = categorizeImports(group)
          const errors: ImportError[] = [
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
              return createFix(fixer, importGroups, sourceCode)
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
      description: 'Enforce sorted imports alphabetically',
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
}
