import {braceStyleControlStatements} from '../rules/braceStyleControlStatements'
import {exportFilenameMatch} from '../rules/exportFilenameMatch'
import {functionCallArgumentLineBreak} from '../rules/functionCallArgumentLineBreak'
import {functionParameterLineBreak} from '../rules/functionParameterLineBreak'
import {importsAndReExportsAtTop} from '../rules/importsAndReExportsAtTop'
import {individualImports} from '../rules/individualImports'
import {individualReExports} from '../rules/individualReExports'
import {multilineUnionTypeAliases} from '../rules/multilineUnionTypeAliases'
import {noInlineObjectTypeParameters} from '../rules/noInlineObjectTypeParameters'
import {noUnnecessaryBraces} from '../rules/noUnnecessaryBraces'
import {oneExportPerFile} from '../rules/oneExportPerFile'
import {preferInlineExport} from '../rules/preferInlineExport'
import {preferRelativeImports} from '../rules/preferRelativeImports'
import {singleLineImports} from '../rules/singleLineImports'
import {singleLineReExports} from '../rules/singleLineReExports'
import {sortedImports} from '../rules/sortedImports'
import {sortedReExports} from '../rules/sortedReExports'
import type {TSESLint} from '@typescript-eslint/utils'

export const customRules: TSESLint.FlatConfig.Config = {
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
        'no-unnecessary-braces': noUnnecessaryBraces,
        'one-export-per-file': oneExportPerFile,
        'prefer-inline-export': preferInlineExport,
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
    '@borela-tech/no-inline-object-type-parameters': 'error',
    '@borela-tech/no-unnecessary-braces': 'error',
    '@borela-tech/one-export-per-file': 'error',
    '@borela-tech/prefer-inline-export': 'error',
    '@borela-tech/single-line-imports': 'error',
    '@borela-tech/single-line-re-exports': 'error',
    '@borela-tech/sorted-imports': 'error',
    '@borela-tech/sorted-re-exports': 'error',
  },
}
