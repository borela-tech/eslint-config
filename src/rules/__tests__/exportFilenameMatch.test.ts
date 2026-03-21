import typescript from 'typescript-eslint'
import {exportFilenameMatch} from '../exportFilenameMatch'
import {RuleTester} from 'eslint'
import type {Rule} from 'eslint'

const rule = exportFilenameMatch as unknown as Rule.RuleModule
const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescript.parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

const valid = [
  {
    code: 'export const foo = 1',
    filename: '/test/foo.ts',
  },
  {
    code: 'export function bar() {}',
    filename: '/test/bar.ts',
  },
  {
    code: 'export class Baz {}',
    filename: '/test/Baz.ts',
  },
  {
    code: 'export type Foo = string',
    filename: '/test/Foo.ts',
  },
  {
    code: 'export interface Bar {}',
    filename: '/test/Bar.ts',
  },
  {
    code: 'export type FooBar = string',
    filename: '/test/FooBar.ts',
  },
  {
    code: 'const foo = 1\nconst bar = 2\nexport {foo, bar}',
    filename: '/test/someFile.ts',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    filename: '/test/index.ts',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    filename: '/test/foo.test.ts',
  },
  {
    code: 'const foo = 1\nexport {foo}',
    filename: '/test/foo.spec.ts',
  },
  {
    code: 'const foo = 1',
    filename: '/test/anyFile.ts',
  },
]

const invalid = [
  {
    code: 'export const helper = 1',
    errors: [
      {
        data: {exportName: 'helper', filename: 'utils'},
        messageId: 'filenameMismatch',
      },
    ],
    filename: '/test/utils.ts',
  },
  {
    code: 'export function myFunction() {}',
    errors: [
      {
        data: {exportName: 'myFunction', filename: 'something'},
        messageId: 'filenameMismatch',
      },
    ],
    filename: '/test/something.ts',
  },
  {
    code: 'export type FooBar = string',
    errors: [
      {
        data: {exportName: 'FooBar', filename: 'fooBar'},
        messageId: 'filenameMismatch',
      },
    ],
    filename: '/test/fooBar.ts',
  },
]

ruleTester.run('export-filename-match', rule, {
  invalid: invalid.map(c => ({...c})),
  valid: valid.map(c => ({...c})),
})
