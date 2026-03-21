import perfectionist from 'eslint-plugin-perfectionist'
import type {TSESLint} from '@typescript-eslint/utils'

export const perfectionistRules: TSESLint.FlatConfig.Config = {
  plugins: {perfectionist},
  rules: {
    'perfectionist/sort-array-includes': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-decorators': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-enums': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-heritage-clauses': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-interfaces': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-intersection-types': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-jsx-props': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-maps': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-object-types': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-objects': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-sets': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-switch-case': ['error', {
      order: 'asc',
      type: 'natural',
    }],
    'perfectionist/sort-union-types': ['error', {
      order: 'asc',
      type: 'natural',
    }],
  },
}
