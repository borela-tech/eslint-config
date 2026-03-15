import type {TSESLint} from '@typescript-eslint/utils'

export const configFilesRules: TSESLint.FlatConfig.Config = {
  files: ['*.config.ts'],
  rules: {
    'no-restricted-exports': 'off',
  },
}
