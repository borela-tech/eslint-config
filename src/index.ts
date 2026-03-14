import eslint from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import stylistic from '@stylistic/eslint-plugin'
import typescript from 'typescript-eslint'
import {braceStyleControlStatements} from './rules/braceStyleControlStatements'
import {exportFilenameMatch} from './rules/exportFilenameMatch'
import {functionCallArgumentLineBreak} from './rules/functionCallArgumentLineBreak'
import {functionParameterLineBreak} from './rules/functionParameterLineBreak'
import {importsAndReExportsAtTop} from './rules/importsAndReExportsAtTop'
import {individualImports} from './rules/individualImports'
import {individualReExports} from './rules/individualReExports'
import {multilineUnionTypeAliases} from './rules/multilineUnionTypeAliases'
import {noInlineObjectTypeParameters} from './rules/noInlineObjectTypeParameters'
import {oneExportPerFile} from './rules/oneExportPerFile'
import {preferRelativeImports} from './rules/preferRelativeImports'
import {singleLineImports} from './rules/singleLineImports'
import {singleLineReExports} from './rules/singleLineReExports'
import {sortedImports} from './rules/sortedImports'
import {sortedReExports} from './rules/sortedReExports'
import type {TSESLint} from '@typescript-eslint/utils'

export const CONFIG: TSESLint.FlatConfig.ConfigArray = [
  {
    ignores: [
      'src/graphql/sdk.ts',
      '**/node_modules/**',
      '**/dist/**',
    ],
  },
  {
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
  },
  eslint.configs.recommended,
  react.configs.flat.recommended,
  stylistic.configs.recommended,
  ...typescript.configs.recommended,
  ...typescript.configs.stylistic,
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    plugins: {
      '@borela-tech': {
        rules: {
          'brace-style-control-statements': braceStyleControlStatements,
          'export-filename-match': exportFilenameMatch,
          'function-call-argument-line-break': functionCallArgumentLineBreak,
          'function-parameter-line-break': functionParameterLineBreak,
          'imports-and-re-exports-at-top': importsAndReExportsAtTop,
          'individual-imports': individualImports,
          'individual-re-exports': individualReExports,
          'multiline-union-type-aliases': multilineUnionTypeAliases,
          'no-inline-object-type-parameters': noInlineObjectTypeParameters,
          'one-export-per-file': oneExportPerFile,
          'prefer-relative-imports': preferRelativeImports,
          'single-line-imports': singleLineImports,
          'single-line-re-exports': singleLineReExports,
          'sorted-imports': sortedImports,
          'sorted-re-exports': sortedReExports,
        },
      },
    },
    rules: {
      '@borela-tech/brace-style-control-statements': 'error',
      '@borela-tech/export-filename-match': 'error',
      '@borela-tech/function-call-argument-line-break': 'error',
      '@borela-tech/function-parameter-line-break': [
        'error',
        {maxLength: 80},
      ],
      '@borela-tech/imports-and-re-exports-at-top': 'error',
      '@borela-tech/individual-imports': 'error',
      '@borela-tech/individual-re-exports': 'error',
      '@borela-tech/multiline-union-type-aliases': 'error',
      '@borela-tech/no-inline-object-type-parameters': 'off',
      '@borela-tech/one-export-per-file': 'error',
      '@borela-tech/single-line-imports': 'error',
      '@borela-tech/single-line-re-exports': 'error',
      '@borela-tech/sorted-imports': 'error',
      '@borela-tech/sorted-re-exports': 'error',
    },
  },
  {
    rules: {
      'capitalized-comments': [
        'error',
        'always',
        {ignoreConsecutiveComments: true},
      ],
      'no-restricted-exports': [
        'error',
        {
          restrictDefaultExports: {
            direct: true,
          },
        },
      ],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['*.config.ts'],
    rules: {
      'no-restricted-exports': 'off',
    },
  },
  {
    rules: {
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
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {fixStyle: 'separate-type-imports'},
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]
