import type {TSESLint} from '@typescript-eslint/utils'

export const generalRules: TSESLint.FlatConfig.Config = {
  rules: {
    'capitalized-comments': [
      'error',
      'always',
      {ignoreConsecutiveComments: true},
    ],
    complexity: ['error', 10],
    'no-restricted-exports': ['error', {
      restrictDefaultExports: {
        direct: true,
      },
    }],
    'react/react-in-jsx-scope': 'off',
  },
}
