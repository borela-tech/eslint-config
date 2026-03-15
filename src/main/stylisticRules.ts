import type {TSESLint} from '@typescript-eslint/utils'

export const stylisticRules: TSESLint.FlatConfig.Config = {
  rules: {
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
    '@stylistic/arrow-parens': [
      'error',
      'as-needed',
    ],
    '@stylistic/block-spacing': 'off',
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
    '@stylistic/quote-props': [
      'error',
      'as-needed',
    ],
    '@stylistic/quotes': [
      'error',
      'single',
      {avoidEscape: true},
    ],
    '@stylistic/semi': [
      'error',
      'never',
      {beforeStatementContinuationChars: 'always'},
    ],
  },
}
