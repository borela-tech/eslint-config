import type {TSESLint} from '@typescript-eslint/utils'

export const languageOptions: TSESLint.FlatConfig.Config = {
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  settings: {
    react: {
      version: '19',
    },
  },
}
