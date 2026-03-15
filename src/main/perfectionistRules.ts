import perfectionist from 'eslint-plugin-perfectionist'
import type {TSESLint} from '@typescript-eslint/utils'

export const perfectionistRules: TSESLint.FlatConfig.Config = {
  plugins: {
    perfectionist,
  },
  rules: {
    'perfectionist/sort-array-includes': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-decorators': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-enums': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-heritage-clauses': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-interfaces': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-intersection-types': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-jsx-props': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-maps': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-object-types': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-objects': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-sets': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-switch-case': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
    'perfectionist/sort-union-types': [
      'error',
      { type: 'natural', order: 'asc' },
    ],
  },
}
