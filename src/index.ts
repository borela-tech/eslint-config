import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import typescript from 'typescript-eslint'

export const CONFIG = typescript.config(
  {
    ignores: [
      'src/graphql/sdk.ts',
      '**/node_modules/**',
      '**/dist/**',
    ],
    settings: {
      react: {
        version: '19',
      },
    },
  },
  eslint.configs.recommended,
  react.configs.flat.recommended,
  stylistic.configs.recommended,
  typescript.configs.recommended,
  typescript.configs.stylistic,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    rules: {
      'capitalized-comments': [
        'error',
        'always',
        {ignoreConsecutiveComments: true},
      ],
      'react/react-in-jsx-scope': 'off',
      '@stylistic/arrow-parens': [
        'error',
        'as-needed',
      ],
      '@stylistic/array-bracket-newline': [
        'error',
        'consistent',
      ],
      '@stylistic/array-bracket-spacing': [
        'error',
        'never',
      ],
      '@stylistic/array-element-newline': [
        'error',
        'consistent',
      ],
      '@stylistic/brace-style': [
        'error',
        '1tbs',
        {allowSingleLine: true},
      ],
      '@stylistic/indent': [
        'error',
        2,
        {ignoredNodes: ['TSMappedType > *']},
      ],
      '@stylistic/jsx-tag-spacing': [
        'error',
        {
          afterOpening: 'never',
          beforeClosing: 'never',
          beforeSelfClosing: 'never',
          closingSlash: 'never',
        },
      ],
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/lines-between-class-members': 'off',
      '@stylistic/object-curly-newline': [
        'error',
        {consistent: true},
      ],
      '@stylistic/object-curly-spacing': [
        'error',
        'never',
      ],
      '@stylistic/operator-linebreak': [
        'error',
        'before',
        {overrides: {'=': 'after'}},
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        {avoidEscape: true},
      ],
      '@stylistic/quote-props': [
        'error',
        'as-needed',
      ],
      '@stylistic/semi': [
        'error',
        'never',
        {beforeStatementContinuationChars: 'always'},
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
    },
  },
)
