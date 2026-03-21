import type {TSESLint} from '@typescript-eslint/utils'

export const typescriptRules: TSESLint.FlatConfig.Config = {
  rules: {
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {fixStyle: 'separate-type-imports'},
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
}
