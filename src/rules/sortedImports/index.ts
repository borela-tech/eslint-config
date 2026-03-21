import {categorizeImports} from './categorizeImports'
import {checkAlphabeticalSorting} from './checkAlphabeticalSorting'
import {checkGroupOrdering} from './checkGroupOrdering'
import {checkSpecifiersSorting} from './checkSpecifiersSorting'
import {createImportFix} from './createFix'
import {getImportGroups} from './getImportGroups'
import type {ImportValidationError} from './ImportValidationError'
import type {MessageIds} from './MessageIds'
import type {TSESLint} from '@typescript-eslint/utils'

export const sortedImports: TSESLint.RuleModule<MessageIds, []> = {
  create(context) {
    return {
      Program(node) {
        const programBody = node.body
        const importGroups = getImportGroups(programBody)
        if (importGroups.length === 0)
          return

        const allImportErrors: ImportValidationError[] = []

        // Check each import group independently
        for (const group of importGroups) {
          const categorized = categorizeImports(group)
          const errors: ImportValidationError[] = [
            ...checkGroupOrdering(categorized),
            ...checkAlphabeticalSorting(categorized),
            ...checkSpecifiersSorting(categorized),
          ]
          allImportErrors.push(...errors)
        }

        for (const error of allImportErrors) {
          context.report({
            fix(fixer) {
              const sourceCode = context.sourceCode
              return createImportFix(fixer, importGroups, sourceCode)
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
